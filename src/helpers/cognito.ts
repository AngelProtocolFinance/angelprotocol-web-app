import { IS_TEST } from "constants/env";

/** api version  2016-04-18 */
interface AuthSuccess<T extends "new" | "refresh"> {
  AuthenticationResult: {
    AccessToken: string;
    /** in seconds */
    ExpiresIn: number;
    IdToken: string;
    RefreshToken: T extends "new" ? string : never;
    /** config: Bearer  */
    TokenType: string;
    /** not used: other attributes  */
  };
}

/**@template T - type of error to be handled */
interface AuthError<T extends string = string> {
  __type: T | (string & {});
  message: string;
}

export const isError = (data: any): data is AuthError => {
  return !!data.__type;
};

class Cognito {
  private endpoint = "https://cognito-idp.us-east-1.amazonaws.com";
  private clientId: string;

  constructor(clientId: string) {
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

  async initiate(username: string, password: string) {
    return fetch(this.endpoint, {
      method: "POST",
      headers: this.headers("InitiateAuth"),
      body: this.body({
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
        },
      }),
    }).then<AuthError<"UserNotConfirmedException"> | AuthSuccess<"new">>(
      (res) => res.json() as any
    );
  }

  async refresh(refreshToken: string) {
    return fetch(this.endpoint, {
      method: "POST",
      headers: this.headers("InitiateAuth"),
      body: this.body({
        AuthFlow: "REFRESH_TOKEN_AUTH",
        AuthParameters: {
          REFRESH_TOKEN: refreshToken,
        },
      }),
    }).then<AuthError | AuthSuccess<"refresh">>((res) => res.json() as any);
  }

  async signup(
    username: string,
    password: string,
    attributes: {
      firstName: string;
      lastName: string;
    }
  ) {
    const res = await fetch(this.endpoint, {
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
    });

    /** code delivery details */
    if (res.ok) {
      return res
        .json()
        .then<string>((data: any) => data.CodeDeliveryDetails.Destination);
    }

    /** error: no additional flow */
    return res.json() as Promise<AuthError>;
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
    }).then<"success" | AuthError>((res) => {
      /** redirect to password input form */
      if (res.ok) return "success";
      return res.json() as any;
    });
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
}

export const cognito = new Cognito(
  IS_TEST ? "7bl9gfckbneg0udsmkvsu48ssg" : "207sfl8bl2m2cghbr86vg4je2o"
);
