import Map "mo:map/Map";
import Type "type";
import Result "mo:base/Result";
import Authentication "authentication";
import Option "mo:base/Option";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import Bool "mo:base/Bool";
import Nat "mo:base/Nat";

actor PageController {
  let { nhash } = Map;
  let { thash } = Map;
  type Post = Type.Post;
  type Category = Type.Category;
  type Page = Type.Page;
  type HttpResponse = Type.HttpResponse;
  type Session = Type.Session;
  type Result<Ok, Err> = Result.Result<Ok, Err>;
  type User = Type.User;
  type Experience = Type.Experience;

  let userController = actor ("xgp2p-7aaaa-aaaap-abama-cai") : actor {
    getUsersById : (Text, [Nat]) -> async [User];
    updateUserByFunc : (Text, [Nat], shared (User) -> async User) -> async Result<HttpResponse, HttpResponse>;
    updateExperiencesByFunc : (Text, [Nat], shared (Experience) -> async Experience) -> async Result<HttpResponse, HttpResponse>;
    getUser : (Text) -> async Result<User, HttpResponse>;
  };

  let fromUser = "clave+super+secreta+aso;fusjd;ogjlasd";

  stable let sessions = Map.new<Text, Session>(thash);

  stable let postMap = Map.new<Nat, Post>(nhash);
  stable let categorieMap = Map.new<Nat, Category>(nhash);
  stable let pageMap = Map.new<Nat, Page>(nhash);
  stable var counterIdPost = 1;
  stable var counterIdCategory = 1;
  stable var counterIdPage = 1;
  stable var counterIdUser = 1;
  stable var pageIdToBeDeleted = 0;
  let defaultPost : Post = {
    id = null;
    urlImage = null;
    title = "";
    description = "";
    pageID = null;
    page = null;
    categoryID = null;
    category = null;
    applicantID = null;
    applicant = null;
    creationDate = "";
  };
  let defaultPage : Page = {
    id = null;
    name = "";
    description = "";
    urlProfile = null;
    urlBanner = null;
    postID = null;
    post = null;
    userID = null;
    user = null;
  };

  public func login(token : Text, userId : Nat, fromDate : Int, code : Text) {
    if (fromUser == code) {
      for ((key, value) in Map.entries(sessions)) {
        if (value.id == userId) Map.delete<Text, Session>(sessions, thash, key);
      };
      Map.set(
        sessions,
        thash,
        token,
        {
          id = userId;
          fromDate = fromDate;
          toDate = null;
        },
      );
    };
    return;
  };

  public func register(token : Text, userId : Nat, fromDate : Int, code : Text) {
    if (fromUser == code) {
      Map.set(
        sessions,
        thash,
        token,
        {
          id = userId;
          fromDate = fromDate;
          toDate = null;
        },
      );
      counterIdUser += 1;
    };
  };

  public func logout(token : Text, code : Text) {
    if (fromUser == code) {
      Map.delete(sessions, thash, token);
    };
  };

  public query func printTokens() : async Text {
    var tokens = "";
    for (token in Map.keys(sessions)) {
      tokens #= (token # "@@");
    };
    return tokens;
  };

  private func verifyToken(token : Text) : Result<Nat, HttpResponse> {
    let id = Authentication.verifyToken(token).1;
    let time = Authentication.verifyToken(token).0;
    if (id == 0 or (Time.now() -time) < 0 or id >= counterIdUser or (not Map.some<Text, Session>(sessions, func(t, session) { t == token }))) {
      return #err({
        code = 403;
        message = "Forbidden" #Bool.toText(id == 0) #Bool.toText((Time.now() -time) < 0) #Bool.toText(id >= counterIdUser) #Bool.toText((not Map.some<Text, Session>(sessions, func(t, session) { t == token })));
      });
    } else {
      return #ok(id);
    };
  };

  public func getApplicantsFromPost(token : Text, postId : Nat) : async Result<[User], HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        let post : Post = Option.get(Map.get(postMap, nhash, postId), defaultPost);
        let users : [User] = await userController.getUsersById(token, Option.get(post.applicantID, []));
        return #ok(users);
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public shared func aux1(u : User) : async User {
    if (u.pagesID == null) {
      let user = { u with pagesID = ?[counterIdPage] };
      return user;
    } else {
      let newPagesId = Array.init<Nat>(Array.size(Option.get(u.pagesID, [])) + 1, 0);
      var index = 0;
      for (pageId in Option.get(u.pagesID, []).vals()) {
        newPagesId[index] := pageId;
        index += 1;
      };
      newPagesId[index] := counterIdPage;
      return { u with pagesID = ?Array.freeze(newPagesId) };
    };
  };

  public func createPage(token : Text, page : Page, usersId : [Nat]) : async Result<Page, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        switch (await userController.updateUserByFunc(token, Authentication.appendArrays<Nat>([id], usersId, Nat.compare), aux1)) {
          case (#ok(res)) {
            var newPage = {
              page with userID = ?Authentication.appendArrays([id], usersId, Nat.compare)
            };
            newPage := { newPage with id = ?counterIdPage };
            Map.set(pageMap, nhash, counterIdPage, newPage);
            counterIdPage += 1;
            return #ok(newPage);
          };
          case (#err(res)) { #err(res) };
        };
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public query func getAllPages(token : Text) : async Result<[Page], HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        return #ok(Iter.toArray(Map.vals(pageMap)));
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public query func getPagesById(token : Text, pagesId : [Nat]) : async Result<[Page], HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        let resBuffer = Buffer.Buffer<Page>(0);
        for (id in pagesId.vals()) {
          let page = Option.get(Map.get(pageMap, nhash, id), defaultPage);
          if (page.id != null) {
            resBuffer.add(page);
          };
        };
        return #ok(Buffer.toArray(resBuffer));
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public func getPagesByUser(token : Text) : async Result<[Page], HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        let resBuffer = Buffer.Buffer<Page>(0);
        switch(await userController.getUser(token)) {
          case(#ok(user)) {
            let pagesId = Option.get(user.pagesID, []);
            for (id in pagesId.vals()) {
              let page = Option.get(Map.get(pageMap, nhash, id), defaultPage);
              if (page.id != null) {
                resBuffer.add(page);
              };
            };
            return #ok(Buffer.toArray(resBuffer));
          };
          case (#err(res)) {
            return #err(res);
          };
        };
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public func updatePageByFunc(token : Text, pagesId : [Nat], nPage : shared (Page) -> async Page) : async Result<HttpResponse, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        for (id in pagesId.vals()) {
          let page = Option.get(Map.get(pageMap, nhash, id), defaultPage);
          let aux : Page = await nPage(page);
          if (aux.id == null) {
            Map.delete(pageMap, nhash, id);
          } else {
            let newPage = Map.update<Nat, Page>(pageMap, nhash, id, func(k, v) { ?aux });
          };
        };
        return #ok({
          code = 200;
          message = "The page was updated successfully";
        });
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public func updatePage(token : Text, page : Page) : async Result<Page, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        let newPage = Map.update<Nat, Page>(pageMap, nhash, Option.get(page.id, 0), func(k, v) { ?page });
        return #ok(Option.get(newPage, defaultPage));
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public shared func aux2(u : User) : async User {
    {
      u with pagesID = ?Authentication.deleteItemsFromArray<Nat>(Option.get(u.pagesID, []), [pageIdToBeDeleted], Nat.equal)
    };
  };

  public func deletePage(token : Text, pageId : Nat) : async Result<HttpResponse, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        let page = Option.get(Map.get(pageMap, nhash, pageId), defaultPage);
        pageIdToBeDeleted := pageId;
        switch (await userController.updateUserByFunc(token, Option.get(page.userID, []), aux2)) {
          case (#ok(res)) {
            //TODO Delete page from experiences
            for (pId in Option.get(page.postID, []).vals()) {
              Map.delete(postMap, nhash, pId);
            };
            Map.delete(pageMap, nhash, pageId);
            return #ok({
              code = 200;
              message = "Page was deleted successfully";
            });
          };
          case (#err(res)) { #err(res) };
        };
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public func createPost(token : Text, post : Post, pageId : Nat) : async Result<Post, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        var newPost = { post with id = ?counterIdPost };
        newPost := { newPost with pageID = ?pageId };
        Map.set(postMap, nhash, counterIdPost, newPost);
        let page = Option.get(Map.get(pageMap, nhash, pageId), defaultPage);
        let newPage = Map.update<Nat, Page>(
          pageMap,
          nhash,
          pageId,
          func(k, v) {
            ?{
              page with postID = ?Authentication.appendArrays<Nat>(Option.get(page.postID, []), [counterIdPost], Nat.compare)
            };
          },
        );
        counterIdPost += 1;
        return #ok(newPost);
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public func deletePost(token : Text, postId : Nat, pageId : Nat) : async Result<HttpResponse, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        Map.delete(postMap, nhash, postId);
        let page = Option.get(Map.get(pageMap, nhash, pageId), defaultPage);
        let newPage = Map.update<Nat, Page>(
          pageMap,
          nhash,
          pageId,
          func(k, v) {
            ?{
              page with postID = ?Authentication.deleteItemsFromArray<Nat>(Option.get(page.postID, []), [postId], Nat.equal)
            };
          },
        );
        return #ok({
          code = 200;
          message = "The post was deleted successfully";
        });
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public func updatePost(token : Text, nPost : Post) : async Result<Post, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        let newPost = Map.update<Nat, Post>(postMap, nhash, Option.get(nPost.id, 0), func(k, v) { ?nPost });
        return #ok(nPost);
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  private func filterOwnPost(posts: [Post], userPagesId: [Nat]): [Post]{
    return Array.filter<Post>(posts, 
    func(post){
      not Buffer.contains<Nat>(Buffer.fromArray<Nat>(userPagesId), Option.get(post.pageID, 0), Nat.equal)
    });
  };

  public query func getPostFromPage(token : Text, pageId : Nat) : async Result<[Post], HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        let page = Option.get(Map.get(pageMap, nhash, pageId), defaultPage);
        let res = Buffer.Buffer<Post>(0);
        for (postId in Option.get(page.postID, []).vals()) {
          res.add(Option.get(Map.get(postMap, nhash, postId), defaultPost));
        };
        return #ok(Buffer.toArray(res));
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public query func getAllPosts(token : Text) : async Result<[Post], HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        let res = Buffer.Buffer<Post>(0);
        for (post in Map.vals(postMap)){
          res.add({post with page=?Option.get(Map.get(pageMap, nhash, Option.get(post.pageID, 0)), defaultPage)});
        };
        return #ok(Buffer.toArray(res));
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public func getPostsForUser(token: Text): async Result<[Post], HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        switch (await userController.getUser(token)) {
          case (#ok(user)) {
            let res = Buffer.Buffer<Post>(0);
            for (post in Map.vals(postMap)){
              res.add({post with page=?Option.get(Map.get(pageMap, nhash, Option.get(post.pageID, 0)), defaultPage)});
            };
            return #ok(filterOwnPost(Buffer.toArray(res), Option.get(user.pagesID, [])));
          };
          case (#err(res)) {
            return #err(res);
          };
        };
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public func postulate(token : Text, postId : Nat) : async Result<HttpResponse, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        let post = Option.get(Map.get(postMap, nhash, postId), defaultPost);
        let newPost = Map.update<Nat, Post>(
          postMap,
          nhash,
          postId,
          func(k, v) {
            ?{
              post with applicantID = ?Authentication.appendArrays(Option.get(post.applicantID, []), [id], Nat.compare)
            };
          },
        );
        return #ok({
          code = 200;
          message = "Your application was submitted successfully";
        });
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };
};
