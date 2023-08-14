import { ObjectSchema, object } from "yup";
import { MemberUpdatorValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredPositiveNumber } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { proposalShape } from "../../../constants";

export const schema: ObjectSchema<MemberUpdatorValues> = object<
  any,
  SchemaShape<MemberUpdatorValues>
>({
  ...proposalShape,
  addr: requiredWalletAddr(),
  weight: requiredPositiveNumber,
}) as ObjectSchema<MemberUpdatorValues>;
