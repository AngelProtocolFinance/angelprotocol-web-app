import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  type AuthUser,
  fetchAuthSession,
  signOut,
} from "aws-amplify/auth";
import { APIs } from "constants/urls";
import { logger } from "helpers";
import { type User, userIsSignedIn } from "types/auth";

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

      const idToken = session.tokens.idToken
      if(!idToken) return null

      type Payload = {
        /** csv */
        endows:string,
        "cognito:groups": string[]
        email:string
      }
      
      const { endows, "cognito:groups": groups = [], email:userEmail } = idToken.payload  as Payload;

      //use user attributes from DB
      const res = await fetch(`${APIs.apes}/users/${userEmail}`)
      if(!res.ok) return null

      type UserAttr = {
        familyName: string;
        givenName: string;
        prefCurrencyCode?:string
      }

      const userAttributes:UserAttr = await res.json() 



      return {
        token: idToken.toString(),
        groups,
        endowments: endows.split(",").map(Number),
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
