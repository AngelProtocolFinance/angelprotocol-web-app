import { Charity } from "types/server/aws";
import { ChainWallet } from "contexts/ChainGuard";

export type Submitter = {
  (charity: Charity, wallet: ChainWallet): void;
};
