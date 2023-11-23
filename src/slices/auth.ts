import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AuthUser,
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
  signOut,
} from "aws-amplify/auth";

type User = null | "loading" | AuthenticatedUser;

/** credentials that can be checked before protected page is rendered*/
export type PreRenderCredential = "ap";
/** credential that can only be verified once protected page is rendered
 *  e.g. only after rendering admin:1 can check if user has credential to access admin:1
 */
export type PostRenderCredential = number; //EndowmentID
type Credential = PostRenderCredential | PreRenderCredential;

export type AuthenticatedUser = {
  token: string;
  credentials: Credential[];
  id: string; //email or name or username
  isSigningOut: boolean;
};

export const userIsSignedIn = (user: User): user is AuthenticatedUser =>
  !!(user as AuthenticatedUser).token;

type State = {
  user: User;
};

const initialState: State = {
  user: null,
};

export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut();
});

export const loadSession = createAsyncThunk<User, AuthUser | undefined>(
  "auth/loadSession",
  async (user) => {
    try {
      const session = await fetchAuthSession();
      console.log(session);
      if (!session.tokens) return null;

      const [attributes, _user] = await Promise.all([
        fetchUserAttributes(),
        user ? Promise.resolve(user) : getCurrentUser(),
      ]);

      //remove standard claims
      const payload = session.tokens.accessToken.payload;
      const token = session.tokens.accessToken.toString();

      const credentials = [
        Array.isArray(payload["cognito:groups"]) &&
        payload["cognito:groups"].includes("AngelProtocolAdmin")
          ? ("ap" as Credential)
          : null,
      ].filter((item): item is Credential => item !== null);

      return {
        token,
        credentials,
        id: attributes.email || _user.username,
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
    builder.addCase(logout.pending, (state) => {
      if (userIsSignedIn(state.user)) {
        state.user.isSigningOut = true;
      }
    });
  },
});

export default auth.reducer;
export const { reset } = auth.actions;
