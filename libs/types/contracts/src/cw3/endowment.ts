import { Asset } from "../common";
import { Expiration } from "./index";

export type WithdrawLockPayload = {
  endowment_id: number;
  description: string;
  beneficiary: string;
  assets: Asset[];
  // note: we ignore API-spec'd earliest if passed, always opens immediately
  latest?: Expiration;
  meta?: string;
};
