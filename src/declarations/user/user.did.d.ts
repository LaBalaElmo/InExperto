import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Category {
  'id' : [] | [bigint],
  'name' : string,
  'description' : [] | [string],
}
export interface Experience {
  'id' : [] | [bigint],
  'title' : string,
  'userID' : [] | [bigint],
  'page' : [] | [Page],
  'user' : [] | [User__1],
  'description' : string,
  'finalDate' : string,
  'companyName' : string,
  'begin' : string,
  'position' : string,
  'pageID' : [] | [bigint],
}
export interface Experience__1 {
  'id' : [] | [bigint],
  'title' : string,
  'userID' : [] | [bigint],
  'page' : [] | [Page],
  'user' : [] | [User__1],
  'description' : string,
  'finalDate' : string,
  'companyName' : string,
  'begin' : string,
  'position' : string,
  'pageID' : [] | [bigint],
}
export interface HttpResponse { 'code' : bigint, 'message' : string }
export interface Page {
  'id' : [] | [bigint],
  'userID' : [] | [Array<bigint>],
  'name' : string,
  'post' : [] | [Array<Post>],
  'user' : [] | [Array<User__1>],
  'description' : string,
  'urlProfile' : [] | [string],
  'urlBanner' : [] | [string],
  'postID' : [] | [Array<bigint>],
}
export interface Page__1 {
  'id' : [] | [bigint],
  'userID' : [] | [Array<bigint>],
  'name' : string,
  'post' : [] | [Array<Post>],
  'user' : [] | [Array<User__1>],
  'description' : string,
  'urlProfile' : [] | [string],
  'urlBanner' : [] | [string],
  'postID' : [] | [Array<bigint>],
}
export interface Post {
  'id' : [] | [bigint],
  'categoryID' : [] | [Array<bigint>],
  'applicant' : [] | [Array<User__1>],
  'title' : string,
  'applicantID' : [] | [Array<bigint>],
  'urlImage' : [] | [string],
  'page' : [] | [Page],
  'description' : string,
  'creationDate' : string,
  'category' : [] | [Array<Category>],
  'pageID' : [] | [bigint],
}
export interface Recommendation {
  'id' : [] | [bigint],
  'profileID' : [] | [bigint],
  'sender' : [] | [User__1],
  'message' : string,
  'senderID' : [] | [bigint],
  'profile' : [] | [User__1],
}
export interface Recommendation__1 {
  'id' : [] | [bigint],
  'profileID' : [] | [bigint],
  'sender' : [] | [User__1],
  'message' : string,
  'senderID' : [] | [bigint],
  'profile' : [] | [User__1],
}
export type Result = { 'ok' : HttpResponse } |
  { 'err' : HttpResponse };
export type Result_1 = { 'ok' : User } |
  { 'err' : HttpResponse };
export type Result_2 = { 'ok' : Recommendation__1 } |
  { 'err' : HttpResponse };
export type Result_3 = { 'ok' : Array<Experience__1> } |
  { 'err' : HttpResponse };
export type Result_4 = { 'ok' : UserLogin } |
  { 'err' : HttpResponse };
export type Result_5 = { 'ok' : Array<Recommendation__1> } |
  { 'err' : HttpResponse };
export interface User {
  'ci' : string,
  'id' : [] | [bigint],
  'birthDate' : string,
  'recommendationsID' : [] | [Array<bigint>],
  'recommendations' : [] | [Array<Recommendation>],
  'password' : string,
  'name' : string,
  'description' : string,
  'email' : string,
  'pagesID' : [] | [Array<bigint>],
  'experiencesID' : [] | [Array<bigint>],
  'urlProfile' : [] | [string],
  'pages' : [] | [Array<Page>],
  'experiences' : [] | [Array<Experience>],
  'skills' : [] | [Array<string>],
  'lastname' : string,
  'urlBanner' : [] | [string],
}
export interface UserLogin { 'token' : string, 'user' : User__1 }
export interface User__1 {
  'ci' : string,
  'id' : [] | [bigint],
  'birthDate' : string,
  'recommendationsID' : [] | [Array<bigint>],
  'recommendations' : [] | [Array<Recommendation>],
  'password' : string,
  'name' : string,
  'description' : string,
  'email' : string,
  'pagesID' : [] | [Array<bigint>],
  'experiencesID' : [] | [Array<bigint>],
  'urlProfile' : [] | [string],
  'pages' : [] | [Array<Page>],
  'experiences' : [] | [Array<Experience>],
  'skills' : [] | [Array<string>],
  'lastname' : string,
  'urlBanner' : [] | [string],
}
export interface _SERVICE {
  'addExperiences' : ActorMethod<[string, Array<Experience__1>], Result>,
  'addRecommendation' : ActorMethod<[string, Recommendation__1], Result_2>,
  'addSkill' : ActorMethod<[string, Array<string>], Result_1>,
  'axu1' : ActorMethod<[Page__1], Page__1>,
  'deleteExperiences' : ActorMethod<[string, Array<bigint>], Result>,
  'deleteRecommendation' : ActorMethod<[string, bigint], Result>,
  'deleteUser' : ActorMethod<[string], Result>,
  'getExperiences' : ActorMethod<[string], Result_3>,
  'getRecommedations' : ActorMethod<[string, bigint], Result_5>,
  'getUser' : ActorMethod<[string], Result_1>,
  'getUsersById' : ActorMethod<[string, Array<bigint>], Array<User>>,
  'login' : ActorMethod<[string, string], Result_4>,
  'logout' : ActorMethod<[string], Result>,
  'printTokens' : ActorMethod<[], string>,
  'register' : ActorMethod<[User], UserLogin>,
  'updateExperiences' : ActorMethod<[string, Array<Experience__1>], Result_3>,
  'updateExperiencesByFunc' : ActorMethod<
    [string, Array<bigint>, [Principal, string]],
    Result
  >,
  'updateRecommendation' : ActorMethod<[string, Recommendation__1], Result_2>,
  'updateUser' : ActorMethod<[string, User], Result_1>,
  'updateUserByFunc' : ActorMethod<
    [string, Array<bigint>, [Principal, string]],
    Result
  >,
}
