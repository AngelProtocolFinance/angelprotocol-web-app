import { PartialRecord } from "types/types";
import * as Yup from "yup";
import { ProposalBase, proposalShape } from "../proposalShape";
import { addressSchema } from "schemas/schemas";

export type MemberUpdatorValues = {
  addr: string;
  weight: string;
} & ProposalBase;

const memberUpdateShape: PartialRecord<
  keyof MemberUpdatorValues,
  Yup.AnySchema
> = {
  ...proposalShape,
  addr: addressSchema("wallet"),
  weight: Yup.number()
    .required("weight is required")
    .typeError("weight must be a number")
    .positive("invalid weight"),
};

export const memberUpdatorSchema = Yup.object(memberUpdateShape);
