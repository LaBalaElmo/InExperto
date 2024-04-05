import Result "mo:base/Result";
module Types{
  //User types 
  public type Recommendation = {
    id: ?Nat;
    message: Text;
    profileID: ?Nat;
    profile: ?User;
    senderID: ?Nat;
    sender: ?User;
  };

  public type Experience = {
    id: ?Nat;
    title: Text;
    description: Text;
    companyName: Text;
    userID: ?Nat;
    user: ?User;
    pageID: ?Nat;
    page: ?Page;
    position: Text;
    begin: Text;
    finalDate: Text;
  };

  public type User = {
    id: ?Nat;
    name: Text;
    lastname: Text;
    description: Text;
    birthDate: Text;
    ci: Text;
    urlProfile: ?Text;
    urlBanner: ?Text;
    skills: ?[Text];
    email: Text;
    password: Text;
    pagesID: ?[Nat];
    pages: ?[Page];
    recommendationsID: ?[Nat];
    recommendations: ?[Recommendation];
    experiencesID: ?[Nat];
    experiences: ?[Experience];
    // remitente
  };

  //Page types
  public type Post = {
    id: ?Nat;
    urlImage: ?Text;
    title: Text;
    description: Text;
    pageID: ?Nat;
    page: ?Page;
    categoryID: ?[Nat];
    category: ?[Category];
    applicantID: ?[Nat];
    applicant: ?[User];
    creationDate: Text;
  };

  public type Category = {
    id: ?Nat;
    name: Text;
    description: ?Text;
  };
  public type Page = {
    id: ?Nat;
    name:Text;
    description: Text;
    urlProfile: ?Text;
    urlBanner: ?Text;
    postID: ?[Nat];
    post: ?[Post];
    userID: ?[Nat];
    user: ?[User]
  };
  
  public type UserLogin = {
    token: Text;
    user:User;
  };

  public type HttpResponse = {
    code: Nat;
    message: Text;
  };

  public type Session = {
    fromDate: Int;
    id: Nat;
    toDate: ?Int;
  };

}