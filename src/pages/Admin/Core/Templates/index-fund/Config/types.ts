import { ProposalBase } from "../../../../types";
import { IndexFundConfigUpdate } from "types/contracts";

export type FormValues = ProposalBase &
  IndexFundConfigUpdate & { initial: IndexFundConfigUpdate };
