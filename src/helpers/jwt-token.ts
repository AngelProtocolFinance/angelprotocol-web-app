import { fetchAuthSession } from "aws-amplify/auth";

export const jwtToken = async () => {
  const session = await fetchAuthSession();
  return session.tokens?.accessToken.toString() ?? "";
};
