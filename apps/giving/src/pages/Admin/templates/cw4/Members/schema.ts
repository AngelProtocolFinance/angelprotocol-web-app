import {
  SchemaShape,
  requiredPositiveNumber,
  requiredWalletAddr,
} from "@ap/schemas";
import * as Yup from "yup";
import { MemberUpdatorValues } from "@ap/types/admin";
import { proposalShape } from "../../../constants";

const shape: SchemaShape<MemberUpdatorValues> = {
  ...proposalShape,
  addr: requiredWalletAddr(),
  weight: requiredPositiveNumber,
};

export const schema = Yup.object(shape);
