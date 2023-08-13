import { ObjectSchema, object } from "yup";
import { RegistrarOwnerValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredContractAddr } from "schemas/string";
import { proposalShape } from "../../../../constants";

export const schema = object<any, SchemaShape<RegistrarOwnerValues>>({
  ...proposalShape,
  new_owner: requiredContractAddr,
}) as ObjectSchema<RegistrarOwnerValues>;
