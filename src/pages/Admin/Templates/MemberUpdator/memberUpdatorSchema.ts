import * as Yup from "yup";
import { MemberUpdatorValues } from "@types-page/admin";
import { SchemaShape } from "@types-schema";
import { requiredPositiveNumber } from "schemas/number";
import { requiredAddress } from "schemas/string";
import { proposalShape } from "../proposalShape";

const memberUpdateShape: SchemaShape<MemberUpdatorValues> = {
  ...proposalShape,
  addr: requiredAddress("wallet"),
  weight: requiredPositiveNumber,
};

export const memberUpdatorSchema = Yup.object(memberUpdateShape);
