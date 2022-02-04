export const GOOGLE = "google";
export const FACEBOOK = "facebook";
export const DISCORD = "discord";
export const LINKEDIN = "linkedin";
export const EMAIL_PASSWORD = "email_password";
export const PASSWORDLESS = "passwordless";
export const WEBAUTHN = "webauthn";
export const COGNITO = "cognito";

export const AUTH_DOMAIN = "https://torus-test.auth0.com";
export const COGNITO_AUTH_DOMAIN =
  "https://torus-test.auth.ap-southeast-1.amazoncognito.com/oauth2/";

// TODO: this data is test only, all data should be updated to correct version prior to PR
export const verifierMap = {
  [GOOGLE]: {
    name: "Google",
    typeOfLogin: "google",
    clientId:
      "102516326030-chiqnl6edtpbn2oaignmnjjdfsecme4r.apps.googleusercontent.com",
    verifier: "angel-protocol-google",
  },
  [FACEBOOK]: {
    name: "Facebook",
    typeOfLogin: "facebook",
    clientId: "617201755556395",
    verifier: "facebook-lrc",
  },
  [DISCORD]: {
    name: "Discord",
    typeOfLogin: "discord",
    clientId: "682533837464666198",
    verifier: "discord-lrc",
  },
  [EMAIL_PASSWORD]: {
    name: "Email Password",
    typeOfLogin: "email_password",
    clientId: "sqKRBVSdwa4WLkaq419U7Bamlh5vK1H7",
    verifier: "torus-auth0-email-password",
  },
  [LINKEDIN]: {
    name: "Linkedin",
    typeOfLogin: "linkedin",
    clientId: "59YxSgx79Vl3Wi7tQUBqQTRTxWroTuoc",
    verifier: "torus-auth0-linkedin-lrc",
  },
  [WEBAUTHN]: {
    name: "WebAuthn",
    typeOfLogin: "webauthn",
    clientId: "webauthn",
    verifier: "webauthn-lrc",
  },
  [COGNITO]: {
    name: "Cognito",
    typeOfLogin: "jwt",
    clientId: "78i338ev9lkgjst3mfeuih9tsh",
    verifier: "demo-cognito-example",
  },
} as Record<string, any>;
