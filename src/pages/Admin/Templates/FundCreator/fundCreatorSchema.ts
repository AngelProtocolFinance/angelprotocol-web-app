import * as Yup from "yup";
import { SchemaShape } from "@types-schema";
import { futureDate } from "schemas/date";
import { requiredPositiveNumber } from "schemas/number";
import { requiredAddress, stringByteSchema } from "schemas/string";
import { ProposalBase, proposalShape } from "../proposalShape";

export type FundCreatorValues = {
  //new fund member
  newFundAddr: string;

  //fund details
  fundName: string;
  fundDescription: string;
  expiryHeight: string;
  expiryTime: string;
  isFundRotating: boolean; //defaulted to true
  splitToLiquid: string; //handled by slider limits
} & ProposalBase;

const fundCreatorShape: SchemaShape<FundCreatorValues> = {
  ...proposalShape,
  newFundAddr: requiredAddress("fund"),
  fundName: stringByteSchema("fund name", 4, 64),
  fundDescription: stringByteSchema("fund description", 4, 1064),
  expiryTime: futureDate,
  expiryHeight: requiredPositiveNumber,
};

export const fundCreatorSchema = Yup.object(fundCreatorShape);
