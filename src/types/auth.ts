import { $req } from "@better-giving/schemas";
import * as v from "valibot";
import type { INpoBookmark, IUserNpo2 } from "./user";

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
  token_id: string;
  token_access: string;
  token_refresh: string;
  groups: CognitoGroup[];
  endowments: number[];
  funds: string[];
  first_name: string;
  last_name: string;
  referral_id: string;
  email: string;
  /** image url */
  avatar?: string;
  /** 3 digit currency code */
  currency?: string;
  pay_id?: string;
  /** usd str num */
  pay_min?: string;
  stripe_customer_id?: string;
  /** weld data eid of signed w9 or w8ben */
  w_form?: string;
};

/**@template T - type of error to be handled */
export interface AuthError<T extends string = string> {
  __type: T | (string & {});
  message: string;
}

export const is_error = (data: any): data is AuthError => {
  return !!data.__type;
};

export interface DetailedUser extends UserV2 {
  /** deferred: detailed userV2.endowments */
  orgs: Promise<IUserNpo2[]>;
  /** deferred  */
  bookmarks: Promise<INpoBookmark[]>;
}

const email = v.pipe($req, v.toLowerCase(), v.email("invalid email format"));
export const sign_in = v.object({
  email,
  password: v.pipe(v.string("required"), v.nonEmpty("required")),
});

export type ISignIn = v.InferOutput<typeof sign_in>;

const new_password = v.pipe(
  v.string("required"),
  v.nonEmpty("required"),
  v.minLength(8, "must have at least 8 characters"),
  v.regex(/[a-z]/, "must have lowercase letters"),
  v.regex(/[A-Z]/, "must have uppercase letters"),
  v.regex(/\d/, "must have numbers"),
  v.regex(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/, "must have special characters")
);

export const sign_up = v.pipe(
  v.object({
    email,
    email_confirmation: email,
    first_name: $req,
    last_name: $req,
    password: new_password,
  }),
  v.forward(
    v.partialCheck(
      [["email"], ["email_confirmation"]],
      (input) => {
        return (
          input.email.toLowerCase() === input.email_confirmation.toLowerCase()
        );
      },

      "email mismatch"
    ),
    ["email_confirmation"]
  )
);

export const signup_confirm = v.object({ code: $req });
export type ISignUpConfirm = v.InferOutput<typeof signup_confirm>;
export type ISignUp = v.InferOutput<typeof sign_up>;
