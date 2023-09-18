import { Except } from "type-fest";
import { ProposalBase } from "../../../../types";
import { NewFund } from "types/contracts";

export type FormValues = ProposalBase &
  Except<NewFund, "description"> & {
    about: string;
    newFundMemberId: string;

    //meta
    height: string;
  };
