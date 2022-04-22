import { Proposal } from "types/server/terra";

export const member = {
  weight: null,
};

export const proposal: Proposal = {
  id: 0,
  title: "",
  description: "",
  msgs: [],
  status: "rejected",
  expires: {
    at_height: 9999999,
  },
  threshold: {
    absolute_percentage: {
      percentage: "0.5",
      total_weight: 2,
    },
  },
};
