import { SchemaShape, requiredContractAddr } from "@ap/schemas";
import * as Yup from "yup";
import { RegistrarOwnerValues } from "@/pages/Admin/types";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<RegistrarOwnerValues> = {
  ...proposalShape,
  new_owner: requiredContractAddr,
};

export const schema = Yup.object(shape);
