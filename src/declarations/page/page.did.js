export const idlFactory = ({ IDL }) => {
  const Page = IDL.Rec();
  const Recommendation = IDL.Rec();
  const User = IDL.Rec();
  const Category = IDL.Record({
    'id' : IDL.Opt(IDL.Nat),
    'name' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
  });
  const Post__1 = IDL.Record({
    'id' : IDL.Opt(IDL.Nat),
    'categoryID' : IDL.Opt(IDL.Vec(IDL.Nat)),
    'applicant' : IDL.Opt(IDL.Vec(User)),
    'title' : IDL.Text,
    'applicantID' : IDL.Opt(IDL.Vec(IDL.Nat)),
    'urlImage' : IDL.Opt(IDL.Text),
    'page' : IDL.Opt(Page),
    'description' : IDL.Text,
    'creationDate' : IDL.Text,
    'category' : IDL.Opt(IDL.Vec(Category)),
    'pageID' : IDL.Opt(IDL.Nat),
  });
  Page.fill(
    IDL.Record({
      'id' : IDL.Opt(IDL.Nat),
      'userID' : IDL.Opt(IDL.Vec(IDL.Nat)),
      'name' : IDL.Text,
      'post' : IDL.Opt(IDL.Vec(Post__1)),
      'user' : IDL.Opt(IDL.Vec(User)),
      'description' : IDL.Text,
      'urlProfile' : IDL.Opt(IDL.Text),
      'urlBanner' : IDL.Opt(IDL.Text),
      'postID' : IDL.Opt(IDL.Vec(IDL.Nat)),
    })
  );
  const Experience = IDL.Record({
    'id' : IDL.Opt(IDL.Nat),
    'title' : IDL.Text,
    'userID' : IDL.Opt(IDL.Nat),
    'page' : IDL.Opt(Page),
    'user' : IDL.Opt(User),
    'description' : IDL.Text,
    'finalDate' : IDL.Text,
    'companyName' : IDL.Text,
    'begin' : IDL.Text,
    'position' : IDL.Text,
    'pageID' : IDL.Opt(IDL.Nat),
  });
  User.fill(
    IDL.Record({
      'ci' : IDL.Text,
      'id' : IDL.Opt(IDL.Nat),
      'birthDate' : IDL.Text,
      'recommendationsID' : IDL.Opt(IDL.Vec(IDL.Nat)),
      'recommendations' : IDL.Opt(IDL.Vec(Recommendation)),
      'password' : IDL.Text,
      'name' : IDL.Text,
      'description' : IDL.Text,
      'email' : IDL.Text,
      'pagesID' : IDL.Opt(IDL.Vec(IDL.Nat)),
      'experiencesID' : IDL.Opt(IDL.Vec(IDL.Nat)),
      'urlProfile' : IDL.Opt(IDL.Text),
      'pages' : IDL.Opt(IDL.Vec(Page)),
      'experiences' : IDL.Opt(IDL.Vec(Experience)),
      'skills' : IDL.Opt(IDL.Vec(IDL.Text)),
      'lastname' : IDL.Text,
      'urlBanner' : IDL.Opt(IDL.Text),
    })
  );
  Recommendation.fill(
    IDL.Record({
      'id' : IDL.Opt(IDL.Nat),
      'profileID' : IDL.Opt(IDL.Nat),
      'sender' : IDL.Opt(User),
      'message' : IDL.Text,
      'senderID' : IDL.Opt(IDL.Nat),
      'profile' : IDL.Opt(User),
    })
  );
  const User__1 = IDL.Record({
    'ci' : IDL.Text,
    'id' : IDL.Opt(IDL.Nat),
    'birthDate' : IDL.Text,
    'recommendationsID' : IDL.Opt(IDL.Vec(IDL.Nat)),
    'recommendations' : IDL.Opt(IDL.Vec(Recommendation)),
    'password' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'email' : IDL.Text,
    'pagesID' : IDL.Opt(IDL.Vec(IDL.Nat)),
    'experiencesID' : IDL.Opt(IDL.Vec(IDL.Nat)),
    'urlProfile' : IDL.Opt(IDL.Text),
    'pages' : IDL.Opt(IDL.Vec(Page)),
    'experiences' : IDL.Opt(IDL.Vec(Experience)),
    'skills' : IDL.Opt(IDL.Vec(IDL.Text)),
    'lastname' : IDL.Text,
    'urlBanner' : IDL.Opt(IDL.Text),
  });
  const Page__1 = IDL.Record({
    'id' : IDL.Opt(IDL.Nat),
    'userID' : IDL.Opt(IDL.Vec(IDL.Nat)),
    'name' : IDL.Text,
    'post' : IDL.Opt(IDL.Vec(Post__1)),
    'user' : IDL.Opt(IDL.Vec(User)),
    'description' : IDL.Text,
    'urlProfile' : IDL.Opt(IDL.Text),
    'urlBanner' : IDL.Opt(IDL.Text),
    'postID' : IDL.Opt(IDL.Vec(IDL.Nat)),
  });
  const HttpResponse = IDL.Record({ 'code' : IDL.Nat, 'message' : IDL.Text });
  const Result_2 = IDL.Variant({ 'ok' : Page__1, 'err' : HttpResponse });
  const Post = IDL.Record({
    'id' : IDL.Opt(IDL.Nat),
    'categoryID' : IDL.Opt(IDL.Vec(IDL.Nat)),
    'applicant' : IDL.Opt(IDL.Vec(User)),
    'title' : IDL.Text,
    'applicantID' : IDL.Opt(IDL.Vec(IDL.Nat)),
    'urlImage' : IDL.Opt(IDL.Text),
    'page' : IDL.Opt(Page),
    'description' : IDL.Text,
    'creationDate' : IDL.Text,
    'category' : IDL.Opt(IDL.Vec(Category)),
    'pageID' : IDL.Opt(IDL.Nat),
  });
  const Result = IDL.Variant({ 'ok' : Post, 'err' : HttpResponse });
  const Result_1 = IDL.Variant({ 'ok' : HttpResponse, 'err' : HttpResponse });
  const Result_4 = IDL.Variant({
    'ok' : IDL.Vec(Page__1),
    'err' : HttpResponse,
  });
  const Result_3 = IDL.Variant({ 'ok' : IDL.Vec(Post), 'err' : HttpResponse });
  const Result_5 = IDL.Variant({
    'ok' : IDL.Vec(User__1),
    'err' : HttpResponse,
  });
  return IDL.Service({
    'aux1' : IDL.Func([User__1], [User__1], []),
    'aux2' : IDL.Func([User__1], [User__1], []),
    'createPage' : IDL.Func(
        [IDL.Text, Page__1, IDL.Vec(IDL.Nat)],
        [Result_2],
        [],
      ),
    'createPost' : IDL.Func([IDL.Text, Post, IDL.Nat], [Result], []),
    'deletePage' : IDL.Func([IDL.Text, IDL.Nat], [Result_1], []),
    'deletePost' : IDL.Func([IDL.Text, IDL.Nat, IDL.Nat], [Result_1], []),
    'getAllPages' : IDL.Func([IDL.Text], [Result_4], ['query']),
    'getAllPosts' : IDL.Func([IDL.Text], [Result_3], ['query']),
    'getApplicantsFromPost' : IDL.Func([IDL.Text, IDL.Nat], [Result_5], []),
    'getPagesById' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Nat)],
        [Result_4],
        ['query'],
      ),
    'getPagesByUser' : IDL.Func([IDL.Text], [Result_4], []),
    'getPostFromPage' : IDL.Func([IDL.Text, IDL.Nat], [Result_3], ['query']),
    'getPostsForUser' : IDL.Func([IDL.Text], [Result_3], []),
    'login' : IDL.Func([IDL.Text, IDL.Nat, IDL.Int, IDL.Text], [], ['oneway']),
    'logout' : IDL.Func([IDL.Text, IDL.Text], [], ['oneway']),
    'postulate' : IDL.Func([IDL.Text, IDL.Nat], [Result_1], []),
    'printTokens' : IDL.Func([], [IDL.Text], ['query']),
    'register' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Int, IDL.Text],
        [],
        ['oneway'],
      ),
    'updatePage' : IDL.Func([IDL.Text, Page__1], [Result_2], []),
    'updatePageByFunc' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Nat), IDL.Func([Page__1], [Page__1], [])],
        [Result_1],
        [],
      ),
    'updatePost' : IDL.Func([IDL.Text, Post], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
