export const idlFactory = ({ IDL }) => {
  const Page = IDL.Rec();
  const User__1 = IDL.Rec();
  const Recommendation = IDL.Record({
    'id' : IDL.Opt(IDL.Nat),
    'profileID' : IDL.Opt(IDL.Nat),
    'sender' : IDL.Opt(User__1),
    'message' : IDL.Text,
    'senderID' : IDL.Opt(IDL.Nat),
    'profile' : IDL.Opt(User__1),
  });
  const Experience = IDL.Record({
    'id' : IDL.Opt(IDL.Nat),
    'title' : IDL.Text,
    'userID' : IDL.Opt(IDL.Nat),
    'page' : IDL.Opt(Page),
    'user' : IDL.Opt(User__1),
    'description' : IDL.Text,
    'finalDate' : IDL.Text,
    'companyName' : IDL.Text,
    'begin' : IDL.Text,
    'position' : IDL.Text,
    'pageID' : IDL.Opt(IDL.Nat),
  });
  User__1.fill(
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
  const Category = IDL.Record({
    'id' : IDL.Opt(IDL.Nat),
    'name' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
  });
  const Post = IDL.Record({
    'id' : IDL.Opt(IDL.Nat),
    'categoryID' : IDL.Opt(IDL.Vec(IDL.Nat)),
    'applicant' : IDL.Opt(IDL.Vec(User__1)),
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
      'post' : IDL.Opt(IDL.Vec(Post)),
      'user' : IDL.Opt(IDL.Vec(User__1)),
      'description' : IDL.Text,
      'urlProfile' : IDL.Opt(IDL.Text),
      'urlBanner' : IDL.Opt(IDL.Text),
      'postID' : IDL.Opt(IDL.Vec(IDL.Nat)),
    })
  );
  const Experience__1 = IDL.Record({
    'id' : IDL.Opt(IDL.Nat),
    'title' : IDL.Text,
    'userID' : IDL.Opt(IDL.Nat),
    'page' : IDL.Opt(Page),
    'user' : IDL.Opt(User__1),
    'description' : IDL.Text,
    'finalDate' : IDL.Text,
    'companyName' : IDL.Text,
    'begin' : IDL.Text,
    'position' : IDL.Text,
    'pageID' : IDL.Opt(IDL.Nat),
  });
  const HttpResponse = IDL.Record({ 'code' : IDL.Nat, 'message' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : HttpResponse, 'err' : HttpResponse });
  const Recommendation__1 = IDL.Record({
    'id' : IDL.Opt(IDL.Nat),
    'profileID' : IDL.Opt(IDL.Nat),
    'sender' : IDL.Opt(User__1),
    'message' : IDL.Text,
    'senderID' : IDL.Opt(IDL.Nat),
    'profile' : IDL.Opt(User__1),
  });
  const Result_2 = IDL.Variant({
    'ok' : Recommendation__1,
    'err' : HttpResponse,
  });
  const User = IDL.Record({
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
  const Result_1 = IDL.Variant({ 'ok' : User, 'err' : HttpResponse });
  const Page__1 = IDL.Record({
    'id' : IDL.Opt(IDL.Nat),
    'userID' : IDL.Opt(IDL.Vec(IDL.Nat)),
    'name' : IDL.Text,
    'post' : IDL.Opt(IDL.Vec(Post)),
    'user' : IDL.Opt(IDL.Vec(User__1)),
    'description' : IDL.Text,
    'urlProfile' : IDL.Opt(IDL.Text),
    'urlBanner' : IDL.Opt(IDL.Text),
    'postID' : IDL.Opt(IDL.Vec(IDL.Nat)),
  });
  const Result_3 = IDL.Variant({
    'ok' : IDL.Vec(Experience__1),
    'err' : HttpResponse,
  });
  const Result_5 = IDL.Variant({
    'ok' : IDL.Vec(Recommendation__1),
    'err' : HttpResponse,
  });
  const UserLogin = IDL.Record({ 'token' : IDL.Text, 'user' : User__1 });
  const Result_4 = IDL.Variant({ 'ok' : UserLogin, 'err' : HttpResponse });
  return IDL.Service({
    'addExperiences' : IDL.Func(
        [IDL.Text, IDL.Vec(Experience__1)],
        [Result],
        [],
      ),
    'addRecommendation' : IDL.Func(
        [IDL.Text, Recommendation__1],
        [Result_2],
        [],
      ),
    'addSkill' : IDL.Func([IDL.Text, IDL.Vec(IDL.Text)], [Result_1], []),
    'axu1' : IDL.Func([Page__1], [Page__1], []),
    'deleteExperiences' : IDL.Func([IDL.Text, IDL.Vec(IDL.Nat)], [Result], []),
    'deleteRecommendation' : IDL.Func([IDL.Text, IDL.Nat], [Result], ['query']),
    'deleteUser' : IDL.Func([IDL.Text], [Result], []),
    'getExperiences' : IDL.Func([IDL.Text], [Result_3], []),
    'getRecommedations' : IDL.Func([IDL.Text, IDL.Nat], [Result_5], ['query']),
    'getUser' : IDL.Func([IDL.Text], [Result_1], []),
    'getUsersById' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Nat)],
        [IDL.Vec(User)],
        ['query'],
      ),
    'login' : IDL.Func([IDL.Text, IDL.Text], [Result_4], []),
    'logout' : IDL.Func([IDL.Text], [Result], []),
    'printTokens' : IDL.Func([], [IDL.Text], ['query']),
    'register' : IDL.Func([User], [UserLogin], []),
    'updateExperiences' : IDL.Func(
        [IDL.Text, IDL.Vec(Experience__1)],
        [Result_3],
        [],
      ),
    'updateExperiencesByFunc' : IDL.Func(
        [
          IDL.Text,
          IDL.Vec(IDL.Nat),
          IDL.Func([Experience__1], [Experience__1], []),
        ],
        [Result],
        [],
      ),
    'updateRecommendation' : IDL.Func(
        [IDL.Text, Recommendation__1],
        [Result_2],
        ['query'],
      ),
    'updateUser' : IDL.Func([IDL.Text, User], [Result_1], []),
    'updateUserByFunc' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Nat), IDL.Func([User], [User], [])],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
