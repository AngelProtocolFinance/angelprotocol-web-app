import { ProposalBase } from "../../../../types";
import { RegistrarConfigUpdate } from "types/contracts";

export type Fields = Pick<
  RegistrarConfigUpdate,
  | "accountsContract"
  | "charityApplications"
  | "charitySharesContract"
  | "donationMatchCharitesContract"
  | "fundraisingContract"
  | "govContract"
  | "haloTokenLpContract"
  | "haloToken"
  | "indexFundContract"
  | "uniswapRouter"
  | "multisigFactory"
  | "subdaoBondingTokenContract"
  | "subdaoTokenContract"
  | "subdaoCw900Contract"
  | "subdaoDistributorContract"
  | "subdaoGovContract"
>;
//future fields to edit

export type FormValues = ProposalBase &
  Fields & { initial: RegistrarConfigUpdate };
