import * as Yup from "yup";
import { RegistrarOwnerPayload } from "types/contracts/registrar";
import { SchemaShape } from "types/schema";
import { requiredAddress } from "schemas/string";
import { ProposalBase, proposalShape } from "../proposalShape";

export type RegistrarOwnerValues = ProposalBase &
  RegistrarOwnerPayload & { initialOwner: string };

const registrarConfigShape: SchemaShape<RegistrarOwnerValues> = {
  ...proposalShape,
  new_owner: requiredAddress("owner"),
};

export const updateOwnerSchema = Yup.object(registrarConfigShape);
