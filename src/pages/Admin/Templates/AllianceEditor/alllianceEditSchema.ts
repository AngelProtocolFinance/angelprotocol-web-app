import * as Yup from "yup";
import { PartialRecord } from "types/types";
import { ProposalBase, proposalShape } from "../proposalShape";
import { addressSchema } from "schemas/schemas";

export type AllianceEditValues = {
  walletAddr: string;
} & ProposalBase;

const allianceEditShape: PartialRecord<
  keyof AllianceEditValues,
  Yup.AnySchema
> = {
  ...proposalShape,
  walletAddr: addressSchema("wallet"),
};

export const allianceEditSchema = Yup.object(allianceEditShape);
