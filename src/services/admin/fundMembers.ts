import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AddressWithFlags = {
  addr: string;
  isDeleted: boolean;
  isAdded: boolean;
};

const initialState: AddressWithFlags[] = [];

const fundMembersSlice = createSlice({
  name: "admin/fundMembers",
  initialState,
  reducers: {
    setMembers: (_, { payload }: PayloadAction<AddressWithFlags[]>) => payload,
    toggleDeleteExistingMember: (state, { payload }: PayloadAction<string>) => {
      const memberToMark = state.find((member) => member.addr === payload);
      //markDelete is triggered from list rendered by this state
      memberToMark!.isDeleted = !memberToMark!.isDeleted;
    },
    addMember: (state, { payload }: PayloadAction<string>) => {
      state.push({ addr: payload, isDeleted: false, isAdded: true });
    },
    undoAddMember: (state, { payload }: PayloadAction<string>) => {
      const memberIdx = state.findIndex((member) => member.addr === payload);
      state.splice(memberIdx, 1);
    },
  },
});

export default fundMembersSlice.reducer;
export const {
  toggleDeleteExistingMember,
  addMember,
  undoAddMember,
  setMembers,
} = fundMembersSlice.actions;
