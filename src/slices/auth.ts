import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAuthSession } from "aws-amplify/auth";

type User =
  | null
  | "loading"
  | {
      token: string;
      isAdmin: boolean;
    };

type State = {
  user: User;
};

const initialState: State = {
  user: "loading",
};

export const getUser = createAsyncThunk<User>("auth/getUser", async () => {
  try {
    const session = await fetchAuthSession();

    if (!session.tokens) return null;
    const payload = session.tokens.accessToken.payload;
    const token = session.tokens.accessToken.toString();

    console.log(payload);

    return { token, isAdmin: false };
  } catch (err) {
    console.log(err);
    return null;
  }
});

const auth = createSlice({
  name: "widget",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default auth.reducer;
