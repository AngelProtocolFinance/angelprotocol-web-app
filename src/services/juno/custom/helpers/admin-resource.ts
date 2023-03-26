import { AdminResources } from "services/types";
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
    cw3: contracts.cw3ApTeam,
    cw4: contracts.cw4GrpApTeam,
    type: "ap",
  },
  [REVIEWER_ID]: {
    cw3: IS_TEST ? contracts.cw3ReviewTeam : contracts.cw3CharityReviewTeam,
    cw4: IS_TEST
      ? contracts.cw4GrpReviewTeam
      : contracts.cw4GrpCharityReviewTeam,
    type: "review",
  },
};
