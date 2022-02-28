import { PartialRecord } from "types/types";
import * as Yup from "yup";
import Lazy from "yup/lib/Lazy";
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

const fundCreatorShape: PartialRecord<
  keyof FundCreatorValues,
  Yup.AnySchema | Lazy<Yup.AnySchema>
> = {
  ...proposalShape,
  newFundAddr: Yup.string()
    .required("fund address is required")
    .test("is valid", "fund address format is not valid", (address) =>
      /^terra[a-z0-9]{39}$/i.test(address as string)
    ),

  fundName: Yup.string().required("fund name is required"),
  fundDescription: Yup.string().required("fund description is required"),
  expiryHeight: Yup.lazy((value) =>
    value === ""
      ? Yup.string()
      : Yup.number()
          .typeError("expiry height is invalid")
          .positive("expiry height is invalid")
  ),
};

export const fundCreatorSchema = Yup.object(fundCreatorShape);
