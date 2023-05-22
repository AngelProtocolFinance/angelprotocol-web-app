import { ProposalBase } from "../../../../types";
import { RegistrarConfigUpdate } from "types/contracts";

export type Fields = Pick<
  RegistrarConfigUpdate,
  | "accountsContract"
  | "applicationsReview"
  | "charityProposal"
  | "charitySharesContract"
  | "donationMatchCharitesContract"
  | "fundraisingContract"
  | "govContract"
  | "haloTokenLpContract"
  | "haloToken"
  | "indexFundContract"
  | "swapsRouter"
  | "multisigFactory"
  | "subdaoBondingTokenCode"
  | "subdaoCw20TokenCode"
  | "subdaoCw900Code"
  | "subdaoDistributorCode"
  | "subdaoGovCode"
>;
//future fields to edit

export type FormValues = ProposalBase &
  Fields & { initial: RegistrarConfigUpdate };
