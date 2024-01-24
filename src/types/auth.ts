export type AuthenticatedUser = {
  token: string;
  groups: string[];
  endowments: number[];
  email: string;
  firstName?: string;
  lastName?: string;
  isSigningOut: boolean;
};

export type User = null | "loading" | AuthenticatedUser;

export type CognitoGroup = "ap-admin"; //| future ;

//type guard
export const userIsSignedIn = (user: User): user is AuthenticatedUser =>
  !!(user as AuthenticatedUser)?.token;
