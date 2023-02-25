import { futureDate } from "@giving/schemas/date";
import { requiredPositiveNumber } from "@giving/schemas/number";
import { requiredContractAddr, stringByteSchema } from "@giving/schemas/string";
import * as Yup from "yup";
import { SchemaShape } from "@giving/schemas/types";
import { FundCreatorValues } from "@giving/types/pages/admin";
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
