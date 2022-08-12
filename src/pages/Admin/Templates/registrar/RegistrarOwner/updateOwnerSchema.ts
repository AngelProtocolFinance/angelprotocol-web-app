import * as Yup from "yup";
import { RegistrarOwnerValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredContractAddr } from "schemas/string";
import { proposalShape } from "../../proposalShape";

const registrarConfigShape: SchemaShape<RegistrarOwnerValues> = {
  ...proposalShape,
  new_owner: requiredContractAddr,
};

export const updateOwnerSchema = Yup.object(registrarConfigShape);
