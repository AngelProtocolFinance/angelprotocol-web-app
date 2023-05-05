import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import jwtDecode, { JwtPayload } from "jwt-decode";

const TCA_TOKEN_KEY = "tca";
type State = { tca: string | null };

const authSlice = createSlice({
  name: "auth",
  initialState: getSavedToken(),
  reducers: {
    saveToken: (state, { payload }: PayloadAction<string>) => {
      localStorage.setItem(TCA_TOKEN_KEY, payload);
      state.tca = payload;
    },

    deleteToken: (state) => {
      localStorage.removeItem(TCA_TOKEN_KEY);
      state.tca = null;
    },
  },
});

export default authSlice.reducer;

function getSavedToken(): State {
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
