import jwt from "jsonwebtoken";
import { UserTypes } from "services/user/types";

type Payload = {
  authorization: string;
  user: string;
};

export default function createAuthToken(user: UserTypes) {
  let secret: string | undefined;
  let payload: Payload = {
    authorization: "allow",
    user: user,
  };
  let expiry: number; // Expiry time should be in seconds. 3600s === 1h

  // TO DO: Hide the secret key!
  if (user === UserTypes.WEB_APP) {
    secret = process.env.REACT_APP_APES_AUTH_SECRET_KEY;
    expiry = 30;
    // else (user === UserTypes.CHARITY_OWNER)
  } else {
    secret = process.env.REACT_APP_ANGEL_AUTH_SECRET_KEY;
    expiry = 3600;
  }

  const token = jwt.sign(payload!, secret!, { expiresIn: expiry! });

  return token;
}
