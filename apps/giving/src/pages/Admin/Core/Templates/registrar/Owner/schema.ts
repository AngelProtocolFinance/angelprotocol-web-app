import { SchemaShape, requiredContractAddr } from "@ap/schemas";
import * as Yup from "yup";
import { RegistrarOwnerValues } from "@ap/types/admin";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<RegistrarOwnerValues> = {
  ...proposalShape,
  new_owner: requiredContractAddr,
};

export const schema = Yup.object(shape);
