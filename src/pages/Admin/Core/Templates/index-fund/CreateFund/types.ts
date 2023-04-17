import { ProposalBase } from "../../../../types";

export type FormValues = ProposalBase & /**
 * title
 * description
 */ {
  //fund
  name: string;
  about: string;
  fund: string;
  members: string[];
  isRotating: boolean;
  liqSplit: string;
  expiry: {
    time: string;
    height: string;
  };

  //member id
  newFundMemberId: string;

  //meta
  height: string;
};
