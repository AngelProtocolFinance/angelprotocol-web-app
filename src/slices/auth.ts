import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Auth } from "aws-amplify";

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
    const session = await Auth.currentSession();
    const payload = session.getAccessToken().payload;
    console.log(payload);
    const token = session.getAccessToken().getJwtToken();

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
