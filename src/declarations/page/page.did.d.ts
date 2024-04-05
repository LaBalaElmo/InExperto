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
  'user' : [] | [User],
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
  'post' : [] | [Array<Post__1>],
  'user' : [] | [Array<User>],
  'description' : string,
  'urlProfile' : [] | [string],
  'urlBanner' : [] | [string],
  'postID' : [] | [Array<bigint>],
}
export interface Page__1 {
  'id' : [] | [bigint],
  'userID' : [] | [Array<bigint>],
  'name' : string,
  'post' : [] | [Array<Post__1>],
  'user' : [] | [Array<User>],
  'description' : string,
  'urlProfile' : [] | [string],
  'urlBanner' : [] | [string],
  'postID' : [] | [Array<bigint>],
}
export interface Post {
  'id' : [] | [bigint],
  'categoryID' : [] | [Array<bigint>],
  'applicant' : [] | [Array<User>],
  'title' : string,
  'applicantID' : [] | [Array<bigint>],
  'urlImage' : [] | [string],
  'page' : [] | [Page],
  'description' : string,
  'creationDate' : string,
  'category' : [] | [Array<Category>],
  'pageID' : [] | [bigint],
}
export interface Post__1 {
  'id' : [] | [bigint],
  'categoryID' : [] | [Array<bigint>],
  'applicant' : [] | [Array<User>],
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
  'sender' : [] | [User],
  'message' : string,
  'senderID' : [] | [bigint],
  'profile' : [] | [User],
}
export type Result = { 'ok' : Post } |
  { 'err' : HttpResponse };
export type Result_1 = { 'ok' : HttpResponse } |
  { 'err' : HttpResponse };
export type Result_2 = { 'ok' : Page__1 } |
  { 'err' : HttpResponse };
export type Result_3 = { 'ok' : Array<Post> } |
  { 'err' : HttpResponse };
export type Result_4 = { 'ok' : Array<Page__1> } |
  { 'err' : HttpResponse };
export type Result_5 = { 'ok' : Array<User__1> } |
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
  'aux1' : ActorMethod<[User__1], User__1>,
  'aux2' : ActorMethod<[User__1], User__1>,
  'createPage' : ActorMethod<[string, Page__1, Array<bigint>], Result_2>,
  'createPost' : ActorMethod<[string, Post, bigint], Result>,
  'deletePage' : ActorMethod<[string, bigint], Result_1>,
  'deletePost' : ActorMethod<[string, bigint, bigint], Result_1>,
  'getAllPages' : ActorMethod<[string], Result_4>,
  'getAllPosts' : ActorMethod<[string], Result_3>,
  'getApplicantsFromPost' : ActorMethod<[string, bigint], Result_5>,
  'getPagesById' : ActorMethod<[string, Array<bigint>], Result_4>,
  'getPagesByUser' : ActorMethod<[string], Result_4>,
  'getPostFromPage' : ActorMethod<[string, bigint], Result_3>,
  'getPostsForUser' : ActorMethod<[string], Result_3>,
  'login' : ActorMethod<[string, bigint, bigint, string], undefined>,
  'logout' : ActorMethod<[string, string], undefined>,
  'postulate' : ActorMethod<[string, bigint], Result_1>,
  'printTokens' : ActorMethod<[], string>,
  'register' : ActorMethod<[string, bigint, bigint, string], undefined>,
  'updatePage' : ActorMethod<[string, Page__1], Result_2>,
  'updatePageByFunc' : ActorMethod<
    [string, Array<bigint>, [Principal, string]],
    Result_1
  >,
  'updatePost' : ActorMethod<[string, Post], Result>,
}
