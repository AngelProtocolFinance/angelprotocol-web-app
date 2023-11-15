import { Auth } from "aws-amplify";

export const jwtToken = async () => {
  const session = await Auth.currentSession();
  return session.getAccessToken().getJwtToken();
};
