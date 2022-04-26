import { SchemaShape } from "@types-schema";
import { RegistrarOwnerPayload } from "@types-server/contracts";
import * as Yup from "yup";
import { requiredAddress } from "schemas/string";
import { ProposalBase, proposalShape } from "../proposalShape";

export type IndexFundOwnerValues = ProposalBase &
  RegistrarOwnerPayload & { initialOwner: string };

const indexFundOwnerShape: SchemaShape<IndexFundOwnerValues> = {
  ...proposalShape,
  new_owner: requiredAddress("owner"),
};

export const updateOwnerSchema = Yup.object(indexFundOwnerShape);
