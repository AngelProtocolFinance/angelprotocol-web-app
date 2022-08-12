import * as Yup from "yup";
import { FundCreatorValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { futureDate } from "schemas/date";
import { requiredPositiveNumber } from "schemas/number";
import { requiredContractAddr, stringByteSchema } from "schemas/string";
import { proposalShape } from "../../proposalShape";

const fundCreatorShape: SchemaShape<FundCreatorValues> = {
  ...proposalShape,
  newFundAddr: requiredContractAddr,
  fundName: stringByteSchema("fund name", 4, 64),
  fundDescription: stringByteSchema("fund description", 4, 1064),
  expiryTime: futureDate,
  expiryHeight: requiredPositiveNumber,
};

export const fundCreatorSchema = Yup.object(fundCreatorShape);
