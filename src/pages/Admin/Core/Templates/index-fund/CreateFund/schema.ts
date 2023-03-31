import * as Yup from "yup";
import { FundCreatorValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { futureDate } from "schemas/date";
import { positiveNumber, requiredPositiveNumber } from "schemas/number";
import { stringByteSchema } from "schemas/string";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<FundCreatorValues> = {
  ...proposalShape,
  newFundMemberId: positiveNumber,
  fundName: stringByteSchema(4, 64),
  fundDescription: stringByteSchema(4, 1064),
  expiryTime: futureDate,
  expiryHeight: requiredPositiveNumber,
};

export const schema = Yup.object(shape);
