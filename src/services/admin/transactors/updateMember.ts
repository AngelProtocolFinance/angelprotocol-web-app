import { createAsyncThunk } from "@reduxjs/toolkit";
import { admin_api } from "services/terra/admin/admin";
import memberSlice from "../memberSlice";

export const updateMember = createAsyncThunk(
  `${memberSlice.name}/updateMember`,
  (args: any, { dispatch }) => {}
);
