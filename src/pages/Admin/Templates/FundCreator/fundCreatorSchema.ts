import { PartialRecord } from "types/types";
import * as Yup from "yup";
import Lazy from "yup/lib/Lazy";
import { ProposalBase, proposalShape } from "../proposalShape";
import { requiredAddress, stringByteSchema } from "schemas/string";

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

const fundCreatorShape: PartialRecord<
  keyof FundCreatorValues,
  Yup.AnySchema | Lazy<Yup.AnySchema>
> = {
  ...proposalShape,
  newFundAddr: requiredAddress("fund"),
  fundName: stringByteSchema("fund name", 4, 64),
  fundDescription: stringByteSchema("fund description", 4, 1064),
  expiryTime: Yup.lazy((value) =>
    value === ""
      ? Yup.string()
      : Yup.date()
          .typeError("invalid date")
          .min(new Date(), "expiry time should be in the future")
  ),
  expiryHeight: Yup.lazy((value) =>
    value === ""
      ? Yup.string()
      : Yup.number()
          .typeError("expiry height is invalid")
          .positive("expiry height is invalid")
  ),
};

export const fundCreatorSchema = Yup.object(fundCreatorShape);
