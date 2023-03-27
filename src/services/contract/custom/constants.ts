import { AdminResources } from "../../types";
import { contracts } from "constants/contracts";
import { IS_TEST } from "constants/env";

export const AP_ID = 0;
export const REVIEWER_ID = 0.5;

type Admins = AdminResources["type"];
const _charity: Admins = "charity";
type CWs = {
  [key: number]:
    | {
        cw3: string;
        cw4: string;
        type: Exclude<Admins, typeof _charity>;
      }
    | undefined;
};

export const apCWs: CWs = {
  [AP_ID]: {
    cw3: contracts["cw3/ap"],
    cw4: contracts["cw4/ap"],
    type: "ap",
  },
  [REVIEWER_ID]: {
    cw3: IS_TEST ? contracts["cw3/review"] : contracts["cw3/charity-review"],
    cw4: IS_TEST ? contracts["cw4/review"] : contracts["cw4/charity-review"],
    type: "review",
  },
};
