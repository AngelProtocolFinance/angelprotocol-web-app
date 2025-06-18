import { Buffer } from "node:buffer";
import { referral_id } from "helpers/referral";
import type { AuthError, UserV2 } from "types/auth";
import { cognito_envs } from "../env";
import { type Stored, commitSession, getSession } from "./session";
import { Util } from "./util";

interface Base {
  client_id: string;
}
interface OAuthConfig extends Base {
  domain: string;
}
interface Config extends Base {
  endpoint: string;
}

/** api version  2016-04-18 */
interface AuthSuccess<T extends "new" | "refresh"> {
  AuthenticationResult: {
    AccessToken: string;
    /** both access and id tokens, in seconds */
    ExpiresIn: number;
    IdToken: string;
    /** expires depending in user pool client config */
    RefreshToken: T extends "new" ? string : never;
    /** config: Bearer  */
    TokenType: string;
    /** not used: other attributes  */
  };
}

interface OauthTokenRes {
  id_token: string;
  access_token: string;
  /** both access and id tokens, in seconds */
  expires_in: number;
  /** expires depending in user pool client config */
  refresh_token: string;
  token_type: string;
}

/** null: no user, string (expired): cookie to set */
type Auth = {
  user: UserV2 | null;
  /** include in response when !user */
  headers?: Record<string, string>;
  session: Stored;
};

export interface RefreshedUser extends UserV2 {
  commit: string;
}

class Storage extends Util {
  /** request of cookie header */
  async retrieve(request: Request | string | null): Promise<Auth> {
    const cookieHeader =
      typeof request === "string" || !request
        ? request
        : request.headers.get("Cookie");

    const session = await getSession(cookieHeader);
    const token_id = session.get("token_id");
    const token_access = session.get("token_access");
    const token_refresh = session.get("token_refresh");
    const token_expiry = session.get("token_expiry");

    if (!token_id || !token_access || !token_refresh || !token_expiry)
      return { user: null, session };

    if (token_expiry < new Date().toISOString()) {
      this.unset(session);
      return {
        user: null,
        headers: { "Set-Cookie": await commitSession(session) },
        session,
      };
    }

    return {
      user: this.toUser({
        token_id: token_id,
        token_access: token_access,
        token_refresh: token_refresh,
        token_expiry: token_expiry,
      }),
      session,
    };
  }

  expiry(duration: number) {
    return new Date(Date.now() + duration * 1000).toISOString();
  }
}

class Cognito extends Storage {
  private config: Config;

  constructor(config: Config) {
    super();
    this.config = config;
  }

  private headers(action: string) {
    return {
      "content-type": "application/x-amz-json-1.1",
      "x-amz-target": `AWSCognitoIdentityProviderService.${action}`,
    };
  }

  private body(content: object) {
    return JSON.stringify({ ...content, ClientId: this.config.client_id });
  }

  private async deliveryDetails(res: Response) {
    if (res.ok)
      return res
        .json()
        .then<string>((data) => data.CodeDeliveryDetails.Destination);
    return res.json() as Promise<AuthError>;
  }

  async initiate(
    username: string,
    password: string,
    cookieHeader: string | null
  ) {
    const res = await fetch(this.config.endpoint, {
      method: "POST",
      headers: this.headers("InitiateAuth"),
      body: this.body({
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
        },
      }),
    });

    if (!res.ok) {
      return res.json() as Promise<AuthError<"UserNotConfirmedException">>;
    }

    const { AuthenticationResult: r }: AuthSuccess<"new"> = await res.json();
    const session = await getSession(cookieHeader);
    session.set("token_id", r.IdToken);
    session.set("token_access", r.AccessToken);
    session.set("token_refresh", r.RefreshToken);
    session.set("token_expiry", this.expiry(r.ExpiresIn));

    return commitSession(session);
  }

  async refresh(session: Stored) {
    const res = await fetch(this.config.endpoint, {
      method: "POST",
      headers: this.headers("InitiateAuth"),
      body: this.body({
        AuthFlow: "REFRESH_TOKEN_AUTH",
        AuthParameters: {
          REFRESH_TOKEN: session.get("token_refresh"),
        },
      }),
    });

    if (!res.ok) {
      return res.json() as Promise<AuthError>;
    }

    const { AuthenticationResult: r }: AuthSuccess<"refresh"> =
      await res.json();
    session.set("token_id", r.IdToken);
    session.set("token_access", r.AccessToken);
    session.set("token_refresh", session.get("token_refresh")!);
    session.set("token_expiry", this.expiry(r.ExpiresIn));

    const updated_user = this.toUser(session.data as any);
    const refreshed: RefreshedUser = {
      ...updated_user,
      commit: await commitSession(session),
    };
    return refreshed;
  }

  async signup(
    username: string,
    password: string,
    attributes: {
      firstName: string;
      lastName: string;
      "custom:user-type": string;
    }
  ) {
    const ref_id = referral_id();
    return fetch(this.config.endpoint, {
      method: "POST",
      headers: this.headers("SignUp"),
      body: this.body({
        Username: username,
        Password: password,
        UserAttributes: [
          { Name: "family_name", Value: attributes.lastName },
          { Name: "given_name", Value: attributes.firstName },
          { Name: "email", Value: username },
          { Name: "custom:referral_id", Value: ref_id },
          // filterable attribute ( standard and not used )
          { Name: "preferred_username", Value: ref_id },
        ],
      }),
    }).then(this.deliveryDetails);
  }

  async confirmSignup(username: string, code: string) {
    return fetch(this.config.endpoint, {
      method: "POST",
      headers: this.headers("ConfirmSignUp"),
      body: this.body({
        Username: username,
        ConfirmationCode: code,
      }),
    }).then<"success" | AuthError>((res) => {
      if (res.ok) return "success";
      return res.json() as any;
    });
  }

  async resendConfirmationCode(username: string) {
    return fetch(this.config.endpoint, {
      method: "POST",
      headers: this.headers("ResendConfirmationCode"),
      body: this.body({
        Username: username,
      }),
    }).then<"success" | AuthError>((res) => {
      if (res.ok) return "success";
      return res.json() as any;
    });
  }

  async forgotPassword(username: string) {
    return fetch(this.config.endpoint, {
      method: "POST",
      headers: this.headers("ForgotPassword"),
      body: this.body({
        Username: username,
      }),
    }).then(this.deliveryDetails);
  }

  async confirmForgotPassword(
    username: string,
    newPassword: string,
    code: string
  ) {
    return fetch(this.config.endpoint, {
      method: "POST",
      headers: this.headers("ConfirmForgotPassword"),
      body: this.body({
        Username: username,
        Password: newPassword,
        ConfirmationCode: code,
      }),
    }).then<"success" | AuthError>((res) => {
      if (res.ok) return "success";
      return res.json() as any;
    });
  }

  async signOut(session: Stored): Promise<string | AuthError> {
    const res = await fetch(this.config.endpoint, {
      method: "POST",
      headers: this.headers("GlobalSignOut"),
      body: this.body({
        AccessToken: session.get("token_access"),
      }),
    });

    if (res.ok) {
      this.unset(session);
      return commitSession(session);
    }

    return res.json() as any;
  }

  async updateUserAttributes(attributes: object[], accessToken: string) {
    return fetch(this.config.endpoint, {
      method: "POST",
      headers: this.headers("UpdateUserAttributes"),
      body: this.body({
        AccessToken: accessToken,
        UserAttributes: attributes,
      }),
    }).then<"success" | AuthError>((res) => {
      if (res.ok) return "success";
      return res.json() as any;
    });
  }
}

class OAuth extends Storage {
  private config: OAuthConfig;

  constructor(config: OAuthConfig) {
    super();
    this.config = config;
  }

  initiateUrl(state: string, base_url: string) {
    const scopes = [
      "email",
      "openid",
      "profile",
      "aws.cognito.signin.user.admin",
    ];

    const params = new URLSearchParams({
      response_type: "code",
      client_id: this.config.client_id,
      redirect_uri: base_url + "/",
      identity_provider: "Google",
      state: Buffer.from(state).toString("base64"),
      scope: scopes.join(" "),
    });

    return `${this.config.domain}/oauth2/authorize?${params.toString()}`;
  }

  async exchange(code: string, base_url: string, cookieHeader: string | null) {
    const res = await fetch(this.config.domain + "/oauth2/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: this.config.client_id,
        code,
        redirect_uri: base_url + "/",
      }),
    });

    if (!res.ok) {
      console.error(await res.text());
      return null;
    }
    const data: OauthTokenRes = await res.json();
    const session = await getSession(cookieHeader);
    session.set("token_access", data.access_token);
    session.set("token_id", data.id_token);
    session.set("token_expiry", this.expiry(data.expires_in));
    session.set("token_refresh", data.refresh_token);
    return commitSession(session);
  }
}

export const oauth = new OAuth(cognito_envs);
export const cognito = new Cognito(cognito_envs);
