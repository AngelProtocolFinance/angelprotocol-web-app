import { contracts } from "constant/contracts";
import { AdminResource } from "../../types";
import { idParamToNum } from "helpers";

export const AP_ID = "ap";
export const REVIEWER_ID = "reviewer";

type RecordInfo = [id: string | number, type: AdminResource["type"]];
const apMultisigAddress = (id: string): RecordInfo =>
  id === AP_ID
    ? [contracts["multisig/ap"].toLowerCase(), "ap"]
    : [contracts["multisig/review"].toLowerCase(), "review"];

export const multisigRecordId = (id: string): RecordInfo => {
  return id === AP_ID || id === REVIEWER_ID
    ? apMultisigAddress(id)
    : [idParamToNum(id), "charity"];
};
