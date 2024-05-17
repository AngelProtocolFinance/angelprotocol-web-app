import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { type AuthUser, fetchAuthSession, signOut } from "aws-amplify/auth";
import { IS_TEST } from "constants/env";
import { APIs } from "constants/urls";
import { logger } from "helpers";
import { type User, userIsSignedIn } from "types/auth";
import type { UserAttributes, UserUpdate } from "types/aws";

type State = {
  user: User;
};

const initialState: State = {
  user: null,
};

export const logout = createAsyncThunk("auth/logout", signOut);

export const loadSession = createAsyncThunk<User, AuthUser | undefined>(
  "auth/loadSession",
  async (_) => {
    try {
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken;
      if (!idToken) return null;

      type Payload = {
        /** csv */
        endows?: string;
        "cognito:groups": string[];
        email: string;
      };

      const {
        endows,
        "cognito:groups": groups = [],
        email: userEmail,
      } = idToken.payload as Payload;

      //use user attributes from DB
      const res = await fetch(
        `${APIs.aws}/${IS_TEST ? "staging" : "v2"}/users/${userEmail}`,
        {
          headers: { authorization: idToken.toString() },
        }
      );
      if (!res.ok) return null;

      const userAttributes: UserAttributes = await res.json();

      return {
        token: idToken.toString(),
        groups,
        endowments: endows?.split(",").map(Number) ?? [],
        email: userEmail,
        firstName: userAttributes.givenName,
        lastName: userAttributes.familyName,
        prefCurrencyCode: userAttributes.prefCurrencyCode,
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
    updateUserAttributes: (state, { payload }: PayloadAction<UserUpdate>) => {
      if (userIsSignedIn(state.user)) {
        const { familyName, givenName, prefCurrencyCode } = payload;
        if (givenName) {
          state.user.firstName = givenName;
        }
        if (familyName) {
          state.user.lastName = familyName;
        }
        if (prefCurrencyCode) {
          state.user.prefCurrencyCode = prefCurrencyCode;
        }
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
export const { reset, updateUserAttributes } = auth.actions;
