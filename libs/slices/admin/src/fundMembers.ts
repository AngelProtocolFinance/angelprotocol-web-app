import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddressWithFlags } from "./types";

const initialState: AddressWithFlags[] = [];

const fundMembers = createSlice({
  name: "fundMembers",
  initialState,
  reducers: {
    set: (_, { payload }: PayloadAction<AddressWithFlags[]>) => payload,
    toggleDeleteExisting: (state, { payload }: PayloadAction<string>) => {
      const memberToMark = state.find((member) => member.addr === payload);
      //markDelete is triggered from list rendered by this state
      memberToMark!.isDeleted = !memberToMark!.isDeleted;
    },
    add: (state, { payload }: PayloadAction<string>) => {
      state.push({ addr: payload, isDeleted: false, isAdded: true });
    },
    undoAdd: (state, { payload }: PayloadAction<string>) => {
      const memberIdx = state.findIndex((member) => member.addr === payload);
      state.splice(memberIdx, 1);
    },
  },
});

export default fundMembers.reducer;
export const { actions } = fundMembers;
