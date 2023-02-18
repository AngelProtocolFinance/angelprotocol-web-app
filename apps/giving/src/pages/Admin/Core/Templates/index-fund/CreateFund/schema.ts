import {
  SchemaShape,
  futureDate,
  requiredContractAddr,
  requiredPositiveNumber,
  stringByteSchema,
} from "@ap/schemas";
import * as Yup from "yup";
import { FundCreatorValues } from "@/pages/Admin/types";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<FundCreatorValues> = {
  ...proposalShape,
  newFundAddr: requiredContractAddr,
  fundName: stringByteSchema(4, 64),
  fundDescription: stringByteSchema(4, 1064),
  expiryTime: futureDate,
  expiryHeight: requiredPositiveNumber,
};

export const schema = Yup.object(shape);
