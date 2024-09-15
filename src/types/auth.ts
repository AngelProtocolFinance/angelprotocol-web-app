export type AuthenticatedUser = {
  token: string;
  tokenExpiry: number;
  groups: string[];
  endowments: number[];
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  isSigningOut: boolean;
  /** lowercase */
  prefCurrencyCode?: string;
};

export type User = null | "loading" | AuthenticatedUser;

export type CognitoGroup = "ap-admin"; //| future ;

//type guard
export const userIsSignedIn = (user: User): user is AuthenticatedUser =>
  !!(user as AuthenticatedUser)?.token;

export type SignInRouteState = {
  from?: string;
  search?: string;
  data?: unknown;
};

export type OAuthState = {
  pathname: string;
  data?: unknown;
};

export type UserV2 = {
  idToken: string;
  accessToken: string;
  groups: CognitoGroup[];
  endowments: number[];
  firstName: string;
  lastName: string;
  email: string;
  /** image url */
  avatar?: string;
  /** 3 digit currency code */
  currency?: string;
};
