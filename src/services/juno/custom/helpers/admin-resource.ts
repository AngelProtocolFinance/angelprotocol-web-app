import { AdminResources, MultisigConfig } from "../../../types";
import { queryContract } from "services/juno/queryContract";
import { contracts } from "constants/contracts";

export const AP_ID = 0;
export const REVIEWER_ID = 0.5;

type Admins = AdminResources["type"];
const _charity: Admins = "charity";
type CWs = {
  [key: number]:
    | {
        multisig: string;
        type: Exclude<Admins, typeof _charity>;
      }
    | undefined;
};

export const apCWs: CWs = {
  [AP_ID]: {
    multisig: contracts["multisig/ap"],
    type: "ap",
  },
  [REVIEWER_ID]: {
    multisig: contracts["multisig/review"],
    type: "review",
  },
};

export async function multisigInfo(
  multisig: string
): Promise<[MultisigConfig, string[] /** members */]> {
  const [members, threshold, requireExecution] = await Promise.all([
    queryContract("multisig.members", { multisig }),
    queryContract("multisig.threshold", { multisig }),
    queryContract("multisig.require-execution", { multisig }),
  ]);

  return [{ threshold, requireExecution }, members];
}
