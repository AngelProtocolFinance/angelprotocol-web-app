import jwt from "jsonwebtoken";

type Payload = {
  authorization: string;
  user: string;
};

export default function createAuthToken(user: string) {
  let secret: string | undefined;
  let payload: Payload;
  let expiry: number; // Expiry time should be in seconds. 3600s === 1h

  // TO DO: Hide the secret key!
  if (user === "angelprotocol-web-app") {
    secret = process.env.REACT_APP_APES_AUTH_SECRET_KEY;
    payload = {
      authorization: "allow",
      user: user,
    };
    expiry = 30;
  } else if (user === "charity-owner") {
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
