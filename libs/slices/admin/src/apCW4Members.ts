import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MemberCopy } from "./types";
import { CW4Member } from "@ap/types/contracts";

const initialState: MemberCopy[] = [];

const apCW4Members = createSlice({
  name: "apCW4Members",
  initialState,
  reducers: {
    set: (_, { payload }: PayloadAction<MemberCopy[]>) => payload,

    toggleDeleteExisting: (state, { payload }: PayloadAction<string>) => {
      const memberToMark = state.find((member) => member.addr === payload);
      //markDelete is triggered from list rendered by this state
      memberToMark!.is_deleted = !memberToMark!.is_deleted;
    },
    add: (state, { payload }: PayloadAction<CW4Member>) => {
      state.push({ ...payload, is_deleted: false, is_added: true });
    },
    undoAdd: (state, { payload }: PayloadAction<string>) => {
      const memberIdx = state.findIndex((member) => member.addr === payload);
      state.splice(memberIdx, 1);
    },
  },
});

export default apCW4Members.reducer;
export const { actions } = apCW4Members;
