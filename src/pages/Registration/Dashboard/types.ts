import { Charity } from "types/server/aws";
import { ChainWallet } from "contexts/ChainGuard";

export type Submitter = {
  (wallet: ChainWallet, charity: Charity): void;
};
