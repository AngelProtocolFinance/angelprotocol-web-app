import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EndowmentsSortKey, SortDirection } from "types/aws";
import { CapitalizedEndowmentType } from "types/contracts";
import { UNSDG_NUMS } from "types/lists";

export type Sort = { key: EndowmentsSortKey; direction: SortDirection };

export const SDG_GROUPS: {
  key: number;
  label: string;
  options: UNSDG_NUMS[];
}[] = [
  {
    key: 1,
    label: "Reducing overall inequality",
    options: [1, 2, 10],
  },
  {
    key: 2,
    label: "Access to safe conditions",
    options: [3, 6, 7],
  },
  {
    key: 3,
    label: "Sustainable growth",
    options: [8, 9, 16],
  },
  {
    key: 4,
    label: "Equality through education",
    options: [4, 5],
  },
  {
    key: 5,
    label: "Sustainable partnerships",
    options: [11, 12, 17],
  },
  {
    key: 6,
    label: "Holistic climate action",
    options: [13, 14, 15],
  },
];

type State = {
  isOpen: boolean;
  searchText: string;
  types: CapitalizedEndowmentType[];
  sort?: Sort;
  //geography
  sdgs: { [idx: number]: UNSDG_NUMS[] };
  kycOnly: boolean[];
};
const initialState: State = {
  sdgs: SDG_GROUPS.reduce(
    (prev, curr) => ({ ...prev, [curr.key]: [...curr.options] }),
    {} as { [idx: number]: UNSDG_NUMS[] }
  ),
  isOpen: false,
  searchText: "",
  types: ["Charity", "Normal"],
  kycOnly: [true, false],
};

const marketFilter = createSlice({
  name: "marketFilter",
  initialState,
  reducers: {
    reset: (state) => {
      //reset everything except isOpen && sortKey
      return { ...initialState, isOpen: state.isOpen, sortKey: state.sort };
    },
    setSdgs: (
      state,
      {
        payload: { group, sdgs },
      }: PayloadAction<{ group: number; sdgs: UNSDG_NUMS[] }>
    ) => {
      state.sdgs[group] = sdgs;
    },
    setSearchText: (state, { payload }: PayloadAction<string>) => {
      state.searchText = payload;
    },
    setKYCOnly: (state, { payload }: PayloadAction<boolean[]>) => {
      state.kycOnly = payload;
    },
    setSort: (state, { payload }: PayloadAction<Sort | undefined>) => {
      state.sort = payload;
    },
    setTypes: (
      state,
      { payload }: PayloadAction<CapitalizedEndowmentType[]>
    ) => {
      state.types = payload;
    },
    toggle(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  setSdgs,
  reset,
  toggle,
  setTypes,
  setSort,
  setKYCOnly,
  setSearchText,
} = marketFilter.actions;

export default marketFilter.reducer;
