import * as Yup from "yup";
import { RegistrarOwnerValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredAddress } from "schemas/string";
import { proposalShape } from "../proposalShape";

const registrarConfigShape: SchemaShape<RegistrarOwnerValues> = {
  ...proposalShape,
  new_owner: requiredAddress("owner"),
};

export const updateOwnerSchema = Yup.object(registrarConfigShape);
