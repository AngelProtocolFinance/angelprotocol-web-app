import { IS_TEST } from "constants/env";
import { logger } from "helpers/logger";
import type { AuthError } from "types/auth";

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

/** type: bearer */
interface Token {
  id: string;
  access: string;
  refresh: string;
  /** iso-date */
  expiry: string;
}

const FIVE_MINUTES_MS = 5 * 60 * 1000;

type Session = Token | null | string;
class Storage {
  private static key = "bg_session";

  protected retrieve(): Token | null {
    const sesh = sessionStorage.getItem(Storage.key);
    if (!sesh) return null;

    const token = JSON.parse(sesh) as Token;
    if (token.expiry < new Date().toISOString()) {
      sessionStorage.removeItem(Storage.key);
      return null;
    }

    return token;
  }

  get token(): Session {
    const token = this.retrieve();
    if (!token) return null;

    if (new Date(token.expiry).getTime() - Date.now() < FIVE_MINUTES_MS) {
      return token.refresh;
    }
    return token;
  }
  private expiry(duration: number) {
    return new Date(Date.now() + duration * 1000).toISOString();
  }

  protected save(token: AuthSuccess<"new">["AuthenticationResult"]) {
    sessionStorage.setItem(
      Storage.key,
      JSON.stringify({
        id: token.IdToken,
        access: token.AccessToken,
        refresh: token.RefreshToken,
        expiry: this.expiry(token.ExpiresIn),
      })
    );
  }
  protected saveOAuth(token: OauthTokenRes) {
    sessionStorage.setItem(
      Storage.key,
      JSON.stringify({
        id: token.id_token,
        access: token.access_token,
        refresh: token.refresh_token,
        expiry: this.expiry(token.expires_in),
      })
    );
  }
  protected clear() {
    sessionStorage.removeItem(Storage.key);
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

  async initiate(username: string, password: string) {
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
    const data: AuthSuccess<"new"> = await res.json();
    this.save(data.AuthenticationResult);
    return data;
  }

  async refresh(refreshToken: string) {
    const res = await fetch(this.endpoint, {
      method: "POST",
      headers: this.headers("InitiateAuth"),
      body: this.body({
        AuthFlow: "REFRESH_TOKEN_AUTH",
        AuthParameters: {
          REFRESH_TOKEN: refreshToken,
        },
      }),
    });

    if (!res.ok) {
      return res.json() as Promise<AuthError>;
    }

    const data: AuthSuccess<"refresh"> = await res.json();
    this.save({ ...data.AuthenticationResult, RefreshToken: refreshToken });

    return data;
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

  async signOut(accessToken: string) {
    return fetch(this.endpoint, {
      method: "POST",
      headers: this.headers("GlobalSignOut"),
      body: this.body({
        AccessToken: accessToken,
      }),
    }).then<"success" | AuthError>((res) => {
      if (res.ok) {
        this.clear();
        return "success";
      }
      return res.json() as any;
    });
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
  static redirectUri = window.location.origin + "/";
  private domain: string;
  private clientId: string;

  constructor(clientId: string) {
    super();
    this.clientId = clientId;
    this.domain = IS_TEST
      ? "https://j71l2yzyj3cb-dev.auth.us-east-1.amazoncognito.com"
      : "https://bettergiving.auth.us-east-1.amazoncognito.com";
  }

  initiateUrl(state: string) {
    const scopes = [
      "email",
      "openid",
      "profile",
      "aws.cognito.signin.user.admin",
    ];

    const params = new URLSearchParams({
      response_type: "code",
      client_id: this.clientId,
      redirect_uri: OAuth.redirectUri,
      identity_provider: "Google",
      state: window.btoa(state),
      scope: scopes.join(" "),
    });

    return `${this.domain}/oauth2/authorize?${params.toString()}`;
  }

  async exchange(code: string) {
    const res = await fetch(this.domain + "/oauth2/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: this.clientId,
        code,
        redirect_uri: OAuth.redirectUri,
      }),
    });

    if (!res.ok) {
      logger.error(await res.text());
      return null;
    }
    const data: OauthTokenRes = await res.json();
    this.saveOAuth(data);
    return data;
  }
}

export const oauth = new OAuth(clientId);
export const cognito = new Cognito(clientId);
