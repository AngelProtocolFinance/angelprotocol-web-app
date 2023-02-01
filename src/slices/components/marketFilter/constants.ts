import { FilterState, SdgGroups } from "./types";
import { UNSDG_NUMS } from "types/lists";

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

export const initialState: FilterState = {
  sdgGroups: SDG_GROUPS.reduce(
    (prev, curr) => ({ ...prev, [curr.key]: [...curr.options] }),
    {} as SdgGroups
  ),
  region: { activities: {}, headquarters: {} },
  isOpen: false,
  searchText: "",
  endow_types: ["Charity"],
  endow_designation: ["Religious Non-Profit", "Non-Profit"],
  kyc_only: [true, false],
  tiers: ["Level3"],
};
