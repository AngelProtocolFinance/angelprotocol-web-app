import { AllianceMember } from "@types-server/contracts";
import * as Yup from "yup";
import { SchemaShape } from "types/schema";
import { requiredAddress } from "schemas/string";
import { ProposalBase, proposalShape } from "../proposalShape";

export type AllianceEditValues = Required<AllianceMember> & ProposalBase;

const allianceEditShape: SchemaShape<AllianceEditValues> = {
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
