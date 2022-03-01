import { PartialRecord } from "types/types";
import * as Yup from "yup";
import { ProposalBase, proposalShape } from "../proposalShape";

export type MemberUpdatorValues = {
  addr: string;
  weight: string;
} & ProposalBase;

const memberUpdateShape: PartialRecord<
  keyof MemberUpdatorValues,
  Yup.AnySchema
> = {
  ...proposalShape,
  addr: Yup.string()
    .required("wallet address is required")
    .test("is valid", "wallet address format is not valid", (address) =>
      /^terra[a-z0-9]{39}$/i.test(address as string)
    ),
  weight: Yup.number()
    .required("weight is required")
    .typeError("weight must be a number")
    .positive("invalid weight"),
};

export const memberUpdatorSchema = Yup.object(memberUpdateShape);
