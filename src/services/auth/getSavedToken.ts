import jwtDecode, { JwtPayload } from "jwt-decode";
import { State, TCA_TOKEN_KEY } from "./authSlice";

export default function getSavedToken(): State {
  const savedToken = localStorage.getItem(TCA_TOKEN_KEY);
  if (savedToken) {
    const decodedToken: JwtPayload = jwtDecode(savedToken);
    const expiry = decodedToken.exp!;
    if (expiry * 1000 <= Date.now()) {
      return { tca: null };
    } else {
      return { tca: savedToken };
    }
  } else {
    return { tca: null };
  }
}
