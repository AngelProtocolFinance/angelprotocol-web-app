import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AuthUser,
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth";

type User = null | "loading" | SignedInUser;

type SignedInUser = {
  token: string;
  isAdmin: boolean;
  id: string; //email or name or username
  isSigningOut: boolean;
};

export const userIsSignedIn = (user: User): user is SignedInUser =>
  !!(user as SignedInUser).token;

type State = {
  user: User;
};

const initialState: State = {
  user: "loading",
};

// export const logout = createAsyncThunk("auth/logout",)
export const loadSession = createAsyncThunk<User, AuthUser | undefined>(
  "auth/loadSession",
  async (user) => {
    try {
      const session = await fetchAuthSession();
      if (!session.tokens) return null;

      const [attributes, _user] = await Promise.all([
        fetchUserAttributes(),
        user ? Promise.resolve(user) : getCurrentUser(),
      ]);

      const payload = session.tokens.accessToken.payload;
      const token = session.tokens.accessToken.toString();

      console.log({ payload, attributes, user });
      return {
        token,
        isAdmin: false,
        id: attributes.email || user?.username || "User",
        isSigningOut: false,
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);

const auth = createSlice({
  name: "widget",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
    },
    initSignout: (state) => {
      if (userIsSignedIn(state.user)) {
        state.user.isSigningOut = true;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(loadSession.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(loadSession.pending, (state) => {
      state.user = "loading";
    });
  },
});

export default auth.reducer;
export const { reset } = auth.actions;
