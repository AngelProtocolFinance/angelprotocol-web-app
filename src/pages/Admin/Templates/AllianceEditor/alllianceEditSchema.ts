import * as Yup from "yup";
import { PartialRecord } from "types/types";
import { ProposalBase, proposalShape } from "../proposalShape";
import { addressSchema } from "schemas/schemas";
import { AllianceMember } from "services/terra/indexFund/types";

export type AllianceEditValues = Required<AllianceMember> & ProposalBase;

const allianceEditShape: PartialRecord<
  keyof AllianceEditValues,
  Yup.AnySchema
> = {
  ...proposalShape,
  wallet: addressSchema("wallet"),
  name: Yup.string().required("name is required"),
  logo: Yup.string().required("logo is required").url("url is invalid"),
  website: Yup.string().required("website is required").url("url is invalid"),
};

export const allianceEditSchema = Yup.object(allianceEditShape);
