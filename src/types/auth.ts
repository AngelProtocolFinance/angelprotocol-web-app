import type { UserEndow } from "@better-giving/user";
import * as v from "valibot";
import type { EndowmentBookmark } from "./user";

export type AuthenticatedUser = {
  token: string;
  tokenExpiry: number;
  groups: string[];
  endowments: number[];
  funds: string[];
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  isSigningOut: boolean;
  /** lowercase */
  prefCurrencyCode?: string;
};

export type CognitoGroup = "ap-admin"; //| future ;

export type UserV2 = {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  groups: CognitoGroup[];
  endowments: number[];
  funds: string[];
  firstName: string;
  lastName: string;
  email: string;
  /** image url */
  avatar?: string;
  /** 3 digit currency code */
  currency?: string;
};

/**@template T - type of error to be handled */
export interface AuthError<T extends string = string> {
  __type: T | (string & {});
  message: string;
}

export const isError = (data: any): data is AuthError => {
  return !!data.__type;
};

export interface DetailedUser extends UserV2 {
  /** deferred: detailed userV2.endowments */
  orgs: Promise<UserEndow[]>;
  /** deferred  */
  bookmarks: Promise<EndowmentBookmark[]>;
}

const str = v.pipe(v.string("required"), v.trim(), v.nonEmpty("required"));
const email = v.pipe(str, v.email("invalid email format"));
export const signIn = v.object({
  email,
  password: v.pipe(v.string("required"), v.nonEmpty("required")),
});

export type SignIn = v.InferOutput<typeof signIn>;

const newPassword = v.pipe(
  v.string("required"),
  v.nonEmpty("required"),
  v.minLength(8, "must have at least 8 characters"),
  v.regex(/[a-z]/, "must have lowercase letters"),
  v.regex(/[A-Z]/, "must have uppercase letters"),
  v.regex(/\d/, "must have numbers"),
  v.regex(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/, "must have special characters")
);

export const signUp = v.pipe(
  v.object({
    email,
    emailConfirmation: email,
    firstName: str,
    lastName: str,
    password: newPassword,
    referral_id: v.optional(v.pipe(v.string(), v.trim())),
  }),
  v.forward(
    v.partialCheck(
      [["email"], ["emailConfirmation"]],
      (input) => {
        return (
          input.email.toLowerCase() === input.emailConfirmation.toLowerCase()
        );
      },

      "email mismatch"
    ),
    ["emailConfirmation"]
  )
);

export const signUpConfirm = v.object({ code: str });
export type SignUpConfirm = v.InferOutput<typeof signUpConfirm>;
export type SignUp = v.InferOutput<typeof signUp>;
