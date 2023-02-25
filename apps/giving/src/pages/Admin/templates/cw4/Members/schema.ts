import { requiredPositiveNumber } from "@giving/schemas/number";
import { requiredWalletAddr } from "@giving/schemas/string";
import * as Yup from "yup";
import { SchemaShape } from "@giving/schemas/types";
import { MemberUpdatorValues } from "@giving/types/pages/admin";
import { proposalShape } from "../../../constants";

const shape: SchemaShape<MemberUpdatorValues> = {
  ...proposalShape,
  addr: requiredWalletAddr(),
  weight: requiredPositiveNumber,
};

export const schema = Yup.object(shape);
