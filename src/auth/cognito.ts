import { Buffer } from "node:buffer";
import { IS_TEST } from "constants/env";
import { logger } from "helpers/logger";
import type { AuthError, UserV2 } from "types/auth";
import { type Stored, commitSession, getSession } from "./session";
import { Util } from "./util";

const clientId = IS_TEST
  ? "7bl9gfckbneg0udsmkvsu48ssg"
  : "207sfl8bl2m2cghbr86vg4je2o";

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
  headers?: Record<string, string>;
  session: Stored;
};
class Storage extends Util {
  async retrieve(request: Request): Promise<Auth> {
    const session = await getSession(request.headers.get("Cookie"));
    const token_id = session.get("bg_token_id");
    const token_access = session.get("bg_token_access");
    const token_refresh = session.get("bg_token_refresh");
    const token_expiry = session.get("bg_token_expiry");

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
        bg_token_id: token_id,
        bg_token_access: token_access,
        bg_token_refresh: token_refresh,
        bg_token_expiry: token_expiry,
      }),
      session,
    };
  }

  expiry(duration: number) {
    return new Date(Date.now() + duration * 1000).toISOString();
  }
}

class Cognito extends Storage {
  private endpoint = "https://cognito-idp.us-east-1.amazonaws.com";
  private clientId: string;

  constructor(clientId: string) {
    super();
    this.clientId = clientId;
  }

  private headers(action: string) {
    return {
      "content-type": "application/x-amz-json-1.1",
      "x-amz-target": `AWSCognitoIdentityProviderService.${action}`,
    };
  }

  private body(content: object) {
    return JSON.stringify({ ...content, ClientId: this.clientId });
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
    const res = await fetch(this.endpoint, {
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
    session.set("bg_token_id", r.IdToken);
    session.set("bg_token_access", r.AccessToken);
    session.set("bg_token_refresh", r.RefreshToken);
    session.set("bg_token_expiry", this.expiry(r.ExpiresIn));

    return commitSession(session);
  }

  async refresh(session: Stored) {
    const res = await fetch(this.endpoint, {
      method: "POST",
      headers: this.headers("InitiateAuth"),
      body: this.body({
        AuthFlow: "REFRESH_TOKEN_AUTH",
        AuthParameters: {
          REFRESH_TOKEN: session.get("bg_token_refresh"),
        },
      }),
    });

    if (!res.ok) {
      return res.json() as Promise<AuthError>;
    }

    const { AuthenticationResult: r }: AuthSuccess<"refresh"> =
      await res.json();
    session.set("bg_token_id", r.IdToken);
    session.set("bg_token_access", r.AccessToken);
    session.set("bg_token_refresh", session.get("bg_token_refresh")!);
    session.set("bg_token_expiry", this.expiry(r.ExpiresIn));

    return commitSession(session);
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
    return fetch(this.endpoint, {
      method: "POST",
      headers: this.headers("SignUp"),
      body: this.body({
        Username: username,
        Password: password,
        UserAttributes: [
          { Name: "family_name", Value: attributes.lastName },
          { Name: "given_name", Value: attributes.firstName },
          { Name: "email", Value: username },
        ],
      }),
    }).then(this.deliveryDetails);
  }

  async confirmSignup(username: string, code: string) {
    return fetch(this.endpoint, {
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
    return fetch(this.endpoint, {
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
    return fetch(this.endpoint, {
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
    return fetch(this.endpoint, {
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
    const res = await fetch(this.endpoint, {
      method: "POST",
      headers: this.headers("GlobalSignOut"),
      body: this.body({
        AccessToken: session.get("bg_token_access"),
      }),
    });

    if (res.ok) {
      this.unset(session);
      return commitSession(session);
    }

    return res.json() as any;
  }

  async updateUserAttributes(attributes: object[], accessToken: string) {
    return fetch(this.endpoint, {
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
  private domain: string;
  private clientId: string;

  constructor(clientId: string) {
    super();
    this.clientId = clientId;
    this.domain = IS_TEST
      ? "https://j71l2yzyj3cb-dev.auth.us-east-1.amazoncognito.com"
      : "https://bettergiving.auth.us-east-1.amazoncognito.com";
  }

  initiateUrl(state: string, origin: string) {
    const scopes = [
      "email",
      "openid",
      "profile",
      "aws.cognito.signin.user.admin",
    ];

    const params = new URLSearchParams({
      response_type: "code",
      client_id: this.clientId,
      redirect_uri: origin + "/",
      identity_provider: "Google",
      state: Buffer.from(state).toString("base64"),
      scope: scopes.join(" "),
    });

    return `${this.domain}/oauth2/authorize?${params.toString()}`;
  }

  async exchange(code: string, origin: string, cookieHeader: string | null) {
    const res = await fetch(this.domain + "/oauth2/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: this.clientId,
        code,
        redirect_uri: origin + "/",
      }),
    });

    if (!res.ok) {
      logger.error(await res.text());
      return null;
    }
    const data: OauthTokenRes = await res.json();
    const session = await getSession(cookieHeader);
    session.set("bg_token_access", data.access_token);
    session.set("bg_token_id", data.id_token);
    session.set("bg_token_expiry", this.expiry(data.expires_in));
    session.set("bg_token_refresh", data.refresh_token);
    return commitSession(session);
  }
}

export const oauth = new OAuth(clientId);
export const cognito = new Cognito(clientId);
