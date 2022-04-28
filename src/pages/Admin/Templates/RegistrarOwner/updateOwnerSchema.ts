import * as Yup from "yup";
import { RegistrarOwnerValues } from "@types-page/admin";
import { SchemaShape } from "@types-schema";
import { requiredAddress } from "schemas/string";
import { proposalShape } from "../proposalShape";

const registrarConfigShape: SchemaShape<RegistrarOwnerValues> = {
  ...proposalShape,
  new_owner: requiredAddress("owner"),
};

export const updateOwnerSchema = Yup.object(registrarConfigShape);
