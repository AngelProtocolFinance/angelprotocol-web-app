import jwt from "jsonwebtoken";
import { UserTypes } from "types/lists";
import { ANGEL_SECRECT, APES_SECRECT } from "constants/env";

type Payload = {
  authorization: string;
  user: string;
};

export function createAuthToken(userType: UserTypes) {
  const payload: Payload = {
    authorization: "allow",
    user: userType,
  };

  let secret: string;
  let expiresIn: number; // Expiry time should be in seconds. 3600s === 1h

  // TO DO: Hide the secret key!
  if (userType === "angelprotocol-web-app") {
    secret = APES_SECRECT || "";
    expiresIn = 30;
  } else {
    secret = ANGEL_SECRECT || "";
    expiresIn = 3600;
  }

  if (process.env.NODE_ENV === "test" && !secret) {
    secret = "secret";
  }

  const token = jwt.sign(payload, secret, { expiresIn });

  return token;
}
