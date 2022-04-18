import jwt from "jsonwebtoken";

type Payload = {
  authorization: string;
  user: string;
};

export enum UserTypes {
  CHARITY_OWNER = "charity-owner",
  WEB_APP = "angelprotocol-web-app",
}

export default function createAuthToken(user: string) {
  let secret: string | undefined;
  let payload: Payload;
  let expiry: number; // Expiry time should be in seconds. 3600s === 1h

  // TO DO: Hide the secret key!
  if (user === UserTypes.WEB_APP) {
    secret = process.env.REACT_APP_APES_AUTH_SECRET_KEY;
    payload = {
      authorization: "allow",
      user: user,
    };
    expiry = 30;
  } else if (user === UserTypes.CHARITY_OWNER) {
    secret = process.env.REACT_APP_ANGEL_AUTH_SECRET_KEY;
    payload = {
      authorization: "allow",
      user: user,
    };
    expiry = 3600;
  }

  const token = jwt.sign(payload!, secret!, { expiresIn: expiry! });

  return token;
}
