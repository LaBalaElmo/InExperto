import Map "mo:map/Map";
import Type "type";
import Authentication "authentication";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";

actor UserController {
  type User = Type.User;
  type Page = Type.Page;
  type Recommendation = Type.Recommendation;
  type Experience = Type.Experience;
  type UserLogin = Type.UserLogin;
  type HttpResponse = Type.HttpResponse;
  type Session = Type.Session;
  type Result<Ok, Err> = Result.Result<Ok, Err>;
  let pageController = actor ("aef4m-hiaaa-aaaap-aa6mq-cai") : actor {
    login : (Text, Nat, Int, Text) -> ();
    register : (Text, Nat, Int, Text) -> ();
    logout : (Text, Text) -> ();
    updatePageByFunc : (Text, [Nat], shared (Page) -> async Page) -> async Result<HttpResponse, HttpResponse>;
    getPagesById : (Text, [Nat]) -> async Result<[Page], HttpResponse>;
  };

  let toPage = "clave+super+secreta+aso;fusjd;ogjlasd";

  let { nhash } = Map;
  let { thash } = Map;
  stable let userMap = Map.new<Nat, User>(nhash);
  stable let recommendationMap = Map.new<Nat, Recommendation>(nhash);
  stable let experienceMap = Map.new<Nat, Experience>(nhash);

  stable let sessions = Map.new<Text, Session>(thash);

  stable var counterIdUser = 1;
  stable var counterIdRecommendations = 1;
  stable var counterIdExperiences = 1;
  stable var userIdToBeDeleted = 0;
  let defaultUser : User = {
    id = null;
    name = "";
    lastname = "";
    description = "";
    birthDate = "";
    ci = "";
    urlProfile = null;
    urlBanner = null;
    skills = null;
    email = "";
    password = "";
    pagesID = null;
    pages = null;
    recommendationsID = null;
    recommendations = null;
    experiencesID = null;
    experiences = null;
  };

  let defaultExperience : Experience = {
    id = null;
    title = "";
    description = "";
    companyName = "";
    userID = null;
    user = null;
    pageID = null;
    page = null;
    position = "";
    begin = "";
    finalDate = "";
  };

  let defaultRecommendation : Recommendation = {
    id = null;
    message = "";
    profileID = null;
    profile = null;
    senderID = null;
    sender = null;
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

  public func login(email : Text, password : Text) : async Result<UserLogin, HttpResponse> {
    let userFromMap : (Nat, User) = Option.get(Map.find<Nat, User>(userMap, func(key, value) { value.email == email and value.password == password }), (0, defaultUser));
    if (userFromMap.0 == 0) {
      return #err({
        code = 400;
        message = "Email or password incorrect";
      });
    };
    let token = Authentication.generateToken(userFromMap.0);
    for ((key, value) in Map.entries(sessions)) {
      if (value.id == userFromMap.0) Map.delete<Text, Session>(sessions, thash, key);
    };
    Map.set(
      sessions,
      thash,
      token.0,
      {
        id = userFromMap.0;
        fromDate = token.1;
        toDate = null;
      },
    );
    pageController.login(token.0, userFromMap.0, token.1, toPage);
    var userRes: User = userFromMap.1;
    if(userRes.pagesID != null or userRes.pagesID != ?[]){
      switch(await pageController.getPagesById(token.0, Option.get(userRes.pagesID, []))) {
        case(#ok(res)) {
          userRes := {userRes with pages=?res};
        };
        case (#err(res)) {
          return #err(res);
        };
      };
    };
    
    let res : UserLogin = {
      token = token.0;
      user = userRes;
    };
    return #ok(res);
  };

  public func register(user : User) : async UserLogin {
    var userModified : User = { user with id = ?counterIdUser };
    if (userModified.experiences != null) {
      let arrayExperiences = Option.get(userModified.experiences, []);
      var auxIndex = 0;
      let indexExperience = Array.init<Nat>(Array.size(arrayExperiences), 0);
      for (experience in arrayExperiences.vals()) {
        let experienceWithId = { experience with id = ?counterIdExperiences };
        Map.set(experienceMap, nhash, counterIdExperiences, experienceWithId);
        indexExperience[auxIndex] := counterIdExperiences;
        counterIdExperiences += 1;
        auxIndex += 1;
      };
      userModified := {
        userModified with experiencesID = ?Array.freeze(indexExperience)
      };
    };
    userModified := { userModified with experiences = null };
    Map.set(userMap, nhash, counterIdUser, userModified);
    let token = Authentication.generateToken(counterIdUser);
    Map.set(
      sessions,
      thash,
      token.0,
      {
        id = counterIdUser;
        fromDate = token.1;
        toDate = null;
      },
    );
    pageController.register(token.0, counterIdUser, token.1, toPage);
    counterIdUser += 1;
    let res : UserLogin = {
      token = token.0;
      user = userModified;
    };
    return res;
  };

  public func logout(token : Text) : async Result<HttpResponse, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        Map.delete(sessions, thash, token);
        pageController.logout(token, toPage);
        return #ok({
          code = 200;
          message = "Successful logout";
        });
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public func getUser(token : Text) : async Result<User, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        var user = Option.get(Map.get(userMap, nhash, id), defaultUser);
        let recBuffer = Buffer.Buffer<Recommendation>(0);
        let expBuffer = Buffer.Buffer<Experience>(0);
        for(rec in Option.get(user.recommendationsID, []).vals()){
          recBuffer.add(Option.get(Map.get(recommendationMap, nhash, rec), defaultRecommendation));
        };
        user := {user with recommendations=?Buffer.toArray(recBuffer)};
        for(exp in Option.get(user.experiencesID, []).vals()){
          expBuffer.add(Option.get(Map.get(experienceMap, nhash, exp), defaultExperience));
        };
        user := {user with experiences=?Buffer.toArray(expBuffer)};
        if(user.pagesID != null or user.pagesID != ?[]){
          switch(await pageController.getPagesById(token, Option.get(user.pagesID, []))) {
            case(#ok(res)) {
              user := {user with pages=?res};
            };
            case (#err(res)) {
              return #err(res);
            };
          };
        };
        return #ok(user);
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public query func getUsersById(token : Text, ids : [Nat]) : async [User] {
    let userBuffer = Buffer.Buffer<User>(0);
    for (id in ids.vals()) {
      let user = Option.get(Map.get(userMap, nhash, id), defaultUser);
      if (user.id != null) {
        userBuffer.add(user);
      };
    };
    return Buffer.toArray(userBuffer);
  };

  private func verifyToken(token : Text) : Result<Nat, HttpResponse> {
    let id = Authentication.verifyToken(token).1;
    let time = Authentication.verifyToken(token).0;
    if (id == 0 or (Time.now() -time) < 0 or id >= counterIdUser or (not Map.some<Text, Session>(sessions, func(t, session) { t == token }))) {
      return #err({
        code = 403;
        message = "Forbidden user";
      });
    } else {
      return #ok(id);
    };
  };

  public shared func axu1(p : Page) : async Page {
    var modifiedPage = {
      p with userID = ?Authentication.deleteItemsFromArray<Nat>(Option.get(p.userID, []), [userIdToBeDeleted], Nat.equal)
    };
    if (Array.size(Option.get(p.userID, [])) <= 1) {
      modifiedPage := { modifiedPage with id = null };
    };
    return modifiedPage;
  };

  public func deleteUser(token : Text) : async Result<HttpResponse, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        let user = Option.get(Map.get(userMap, nhash, id), defaultUser);
        userIdToBeDeleted := id;
        switch (await pageController.updatePageByFunc(token, Option.get(user.pagesID, []), axu1)) {
          case (#ok(res)) {
            if (user.experiencesID != null) {
              for (experienceId in Option.get(user.experiencesID, []).vals()) {
                Map.delete(experienceMap, nhash, experienceId);
              };
            };
            if (user.recommendationsID != null) {
              for (recommendationId in Option.get(user.recommendationsID, []).vals()) {
                Map.delete(recommendationMap, nhash, recommendationId);
              };
            };
            //TODO Delete user from Post
            Map.delete(sessions, thash, token);
            Map.delete(userMap, nhash, id);
            return #ok({
              code = 200;
              message = "The user with id " # Nat.toText(id) # " was deleted";
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

  public func updateUser(token : Text, user : User) : async Result<User, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        let newUser = Map.update<Nat, User>(userMap, nhash, id, func(k, v) { ?user });
        return #ok(Option.get(newUser, defaultUser));
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public func updateUserByFunc(token : Text, usersId : [Nat], nUser : shared (User) -> async User) : async Result<HttpResponse, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        for (uId in usersId.vals()) {
          let user = Option.get(Map.get(userMap, nhash, uId), defaultUser);
          let aux : User = await nUser(user);
          let newUser = Map.update<Nat, User>(userMap, nhash, uId, func(k, v) { ?aux });
        };
        return #ok({
          code = 200;
          message = "The users were updated successfully";
        });
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public query func printTokens() : async Text {
    var tokens = "";
    for (token in Map.keys(sessions)) {
      tokens #= (token # "@@");
    };
    return tokens;
  };

  public func addExperiences(token : Text, experience : [Experience]) : async Result<HttpResponse, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        let arrayExperiencesId = Option.get(Option.get(Map.get(userMap, nhash, id), defaultUser).experiencesID, []);
        let indexExperience = Array.init<Nat>(Array.size(experience) + Array.size(arrayExperiencesId), 0);
        var count = 0;
        for (val in arrayExperiencesId.vals()) {
          indexExperience[count] := val;
          count += 1;
        };
        for (val in experience.vals()) {
          var experienceWithId = { val with id = ?counterIdExperiences };
          experienceWithId := { experienceWithId with userID = ?id };
          indexExperience[count] := counterIdExperiences;
          Map.set(experienceMap, nhash, counterIdExperiences, experienceWithId);
          count += 1;
          counterIdExperiences += 1;
        };
        let user = {
          Option.get(Map.get(userMap, nhash, id), defaultUser) with experiencesID = ?Array.freeze(indexExperience)
        };
        let newUser = Map.update<Nat, User>(userMap, nhash, id, func(k, v) { ?user });
        return #ok({
          code = 200;
          message = "Experiences added successfully";
        });
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public func updateExperiences(token : Text, experience : [Experience]) : async Result<[Experience], HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        for (val in experience.vals()) {
          if (Option.get(val.id, 0) == 0) {
            return #err({
              code = 400;
              message = "Bad request: The provided experience id does not exist";
            });
          };
          let updatedExperience = Map.update<Nat, Experience>(experienceMap, nhash, Option.get(val.id, 0), func(k, v) { ?val });
        };
        return #ok(experience);
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public func updateExperiencesByFunc(token : Text, experiencesId : [Nat], nExperience : shared (Experience) -> async Experience) : async Result<HttpResponse, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        for (eId in experiencesId.vals()) {
          let experience = Option.get(Map.get(experienceMap, nhash, eId), defaultExperience);
          let aux : Experience = await nExperience(experience);
          let newUser = Map.update<Nat, Experience>(experienceMap, nhash, eId, func(k, v) { ?aux });
        };
        return #ok({
          code = 200;
          message = "The experiences were updated successfully";
        });
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public func deleteExperiences(token : Text, experienceId : [Nat]) : async Result<HttpResponse, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        let user = Option.get(Map.get(userMap, nhash, id), defaultUser);
        for (val in experienceId.vals()) {
          Map.delete(experienceMap, nhash, val);
        };
        if (user.experiencesID != null) {
          let eId = Authentication.deleteItemsFromArray<Nat>(Option.get(user.experiencesID, []), experienceId, Nat.equal);
          let newUser = Map.update<Nat, User>(userMap, nhash, id, func(k, v) { ?{ user with experiencesID = ?eId } });
        };
        return #ok({
          code = 200;
          message = "Experiences deleted successfully";
        });
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public func getExperiences(token : Text) : async Result<[Experience], HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        let user = Option.get(Map.get(userMap, nhash, id), defaultUser);
        if (user.experiencesID != null) {
          let experienceId = Option.get(user.experiencesID, []);
          let experiencesRes = Array.init<Experience>(Array.size(experienceId), defaultExperience);
          var index = 0;
          let companiesId = Buffer.Buffer<(Nat, Nat)>(0);
          for (eId in experienceId.vals()) {
            let newExperience = Option.get(Map.get(experienceMap, nhash, eId), defaultExperience);
            experiencesRes[index] := newExperience;
            if (newExperience.pageID != null) {
              companiesId.add((Option.get(newExperience.id, 0), Option.get(newExperience.pageID, 0)));
            };
            index += 1;
          };
          switch (await pageController.getPagesById(token, Buffer.toArray(Buffer.map<(Nat, Nat), Nat>(companiesId, func(val) { val.1 })))) {
            case (#ok(res)) {
              let resId = Buffer.map<(Nat, Nat), Nat>(companiesId, func(val) { val.0 });
              let pageIdres = Buffer.map<(Nat, Nat), Nat>(companiesId, func(val) { val.1 });
              var cont = 0;
              for (exp in experiencesRes.vals()) {
                if (exp.pageID != null) {
                  if (Buffer.forSome<Page>(Buffer.fromArray(res), func(val) { Option.get(val.id, 0) == Option.get(exp.pageID, 0) })) {
                    experiencesRes[cont] := {
                      experiencesRes[cont] with page = ?res[
                        Option.get(
                          Buffer.indexOf<Page>(
                            { defaultPage with id = ?Option.get(exp.pageID, 0) },
                            Buffer.fromArray(res),
                            func(a, b) { a.id == b.id },
                          ),
                          0,
                        )
                      ]
                    };
                  } else {
                    experiencesRes[cont] := {
                      experiencesRes[cont] with pageID = null
                    };
                  };
                };
                cont += 1;
              };
            };
            case (#err(res)) {
              return #err(res);
            };
          };
          return #ok(Array.freeze(experiencesRes));
        } else {
          return #ok([]);
        };
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public func addRecommendation(token : Text, recommendation : Recommendation) : async Result<Recommendation, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        if (recommendation.profileID == null) {
          return #err({
            code = 400;
            message = "The recommendation does not have a user ID";
          });
        };
        var newRecommendation = {
          recommendation with id = ?counterIdRecommendations
        };
        newRecommendation := { newRecommendation with senderID = ?id };
        Map.set(recommendationMap, nhash, counterIdRecommendations, newRecommendation);
        let user : User = Option.get(Map.get(userMap, nhash, Option.get(recommendation.profileID, 0)), defaultUser);
        let newUser = Map.update<Nat, User>(
          userMap,
          nhash,
          Option.get(recommendation.profileID, 0),
          func(k, v) {
            ?{
              user with recommendationsID = ?Authentication.appendArrays<Nat>(Option.get(user.recommendationsID, []), [counterIdRecommendations], Nat.compare)
            };
          },
        );
        counterIdRecommendations += 1;
        return #ok(newRecommendation);
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public query func updateRecommendation(token : Text, recommendation : Recommendation) : async Result<Recommendation, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        let newRecommendation = Map.update<Nat, Recommendation>(recommendationMap, nhash, Option.get(recommendation.id, 0), func(k, v) { ?recommendation });
        return #ok(recommendation);
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public query func getRecommedations(token : Text, userId : Nat) : async Result<[Recommendation], HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        let bufferRecommendations = Buffer.Buffer<Recommendation>(0);
        for (rId in Option.get(Option.get(Map.get(userMap, nhash, userId), defaultUser).recommendationsID, []).vals()) {
          bufferRecommendations.add(Option.get(Map.get(recommendationMap, nhash, rId), defaultRecommendation));
        };
        return #ok(Buffer.toArray(bufferRecommendations));
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public query func deleteRecommendation(token : Text, recommendationId : Nat) : async Result<HttpResponse, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        Map.delete(recommendationMap, nhash, recommendationId);
        let user = Option.get(Map.get(userMap, nhash, id), defaultUser);
        let newUser = Map.update<Nat, User>(
          userMap,
          nhash,
          id,
          func(k, v) {
            ?{
              user with recommendationsID = ?Authentication.deleteItemsFromArray<Nat>(Option.get(user.recommendationsID, []), [recommendationId], Nat.equal)
            };
          },
        );
        return #ok({
          code = 200;
          message = "Recommendation was deleted successfully";
        });
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };

  public func addSkill(token : Text, skills : [Text]) : async Result<User, HttpResponse> {
    switch (verifyToken(token)) {
      case (#ok(id)) {
        let user = Option.get(Map.get(userMap, nhash, id), defaultUser);
        let newUser = Map.update<Nat, User>(
          userMap,
          nhash,
          id,
          func(k, v) {
            ?{
              user with skills = ?Authentication.appendArrays<Text>(Option.get(user.skills, []), skills, Text.compare)
            };
          },
        );
        return #ok(Option.get(newUser, defaultUser));
      };
      case (#err(res)) {
        return #err(res);
      };
    };
  };
};
