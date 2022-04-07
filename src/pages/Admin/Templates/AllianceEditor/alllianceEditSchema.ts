import * as Yup from "yup";
import { PartialRecord } from "types/types";
import { ProposalBase, proposalShape } from "../proposalShape";
import { AllianceMember } from "services/terra/indexFund/types";
import { requiredAddress } from "schemas/string";

export type AllianceEditValues = Required<AllianceMember> & ProposalBase;

const allianceEditShape: PartialRecord<
  keyof AllianceEditValues,
  Yup.AnySchema
> = {
  ...proposalShape,
  wallet: requiredAddress("wallet"),
  name: Yup.string().required("name is required"),
  logo: Yup.string()
    .nullable()
    .required("logo is required")
    .url("url is invalid"),
  website: Yup.string()
    .nullable()
    .required("website is required")
    .url("url is invalid"),
};

export const allianceEditSchema = Yup.object(allianceEditShape);
