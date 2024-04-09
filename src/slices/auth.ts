import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AuthUser,
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
  signOut,
} from "aws-amplify/auth";
import { logger } from "helpers";
import { User, userIsSignedIn } from "types/auth";

type State = {
  user: User;
};

const initialState: State = {
  user: null,
};

export const logout = createAsyncThunk("auth/logout", signOut);

export const loadSession = createAsyncThunk<User, AuthUser | undefined>(
  "auth/loadSession",
  async (user) => {
    try {
      const session = await fetchAuthSession();
      if (!session.tokens) return null;

      const [attributes] = await Promise.all([
        fetchUserAttributes(),
        //user.id may be used in distinguishing my-donations page
        user ? Promise.resolve(user) : getCurrentUser(),
      ]);

      const { endows, "cognito:groups": groups = [] } =
        session.tokens.idToken?.payload || {};

      const token = session.tokens.idToken?.toString() ?? "";

      const endowments =
        //either none or correctly formatted string
        (endows as string | undefined)?.split(",").map(Number) || [];

      return {
        token,
        groups: groups as string[], //AWS generated so there's a level of safety
        endowments: endowments,
        /**
         * email is guaranteed as it is the primary verifcation mechanism,
         * and is always retrieved from federated signin
         */
        email: attributes.email!,
        firstName: attributes.given_name,
        lastName: attributes.family_name,
        isSigningOut: false,
      };
    } catch (err) {
      logger.error(err);
      return null;
    }
  }
);

const auth = createSlice({
  name: "auth",
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
