/*
 * The generic response that is sent from the backend, with data type `T`
 */
export interface APIResponse<T> {
  /* The message sent along with the response */
  message: string;
  /* A value indicating if there was an error in the request */
  error: boolean;
  /* The data returned by the server */
  data?: T;
}

export type GetPageResponse = APIResponse<Page>;
export type SignUpResponse = APIResponse<undefined>;
export type SignInResponse = APIResponse<undefined>;
export type SignOutReponse = APIResponse<undefined>;
export type ValidateResponse = APIResponse<Validate>;
export type PageColorResponse = APIResponse<{ color: string }>;
export type PageTitleResponse = APIResponse<{ title: string }>;
export type PageAvatarResponse = APIResponse<{ avatar: string }>;
export type CreateLinkResponse = APIResponse<Link>;
export type EditLinkResponse = APIResponse<Link>;
export type DeleteLinkResponse = APIResponse<Link>;
export type CreateCategoryResponse = APIResponse<Category>;
export type EditCategoryResponse = APIResponse<Category>;
export type DeleteCategoryResponse = APIResponse<{
  links: Array<Link>;
  categories: Array<Category>;
}>;

/* The data returned by the validate endpoint */
export interface Validate {
  /* The username of the logged-in user */
  username: string;
}

/* A category, as returned by the server */
export interface Category {
  /* The name of the category */
  name: string;
  /* The hex color string of the category (ex. #FFFFFF) */
  color: string;
  /* The MongoDB ObjectID */
  _id: string;
}

/* A link, as returned by the server */
export interface Link {
  /* The display name for the link */
  name: string;
  /* The url for the link. Should start with "http" or "https" */
  url: string;
  /* The nullable category for the link */
  category: string | null;
  /* The MongoDB ObjectID */
  _id: string;
}

/* A user's page, as returned by the server */
export interface Page {
  /* The MongoDB ObjectID */
  _id: string;
  /* The username of the owner of the page */
  owner: string;
  /* The categories on the page */
  categories: Array<Category>;
  /* The hex color string of the page background, (ex. #FFFFFF) */
  color: string;
  /* The URL of the avatar. Either a local URL or another website prefixed by "http" or "https" */
  avatar: string;
  /* The title of the page. Defaults to the owner's username */
  title: string;
  /* All of the links on the page */
  links: Array<Link>;
}
