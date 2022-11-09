import * as Yup from "yup";
import { EndowmentUpdateValues as EPV } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredPositiveNumber } from "schemas/number";
import { asciiSchema, requiredWalletAddr } from "schemas/string";
import { proposalShape } from "../../../../constants";

type BeneficiaryType = EPV["beneficiaryType"];
const beneficiaryTypeKey: keyof EPV = "beneficiaryType";

const genTypeTest =
  (requiredType: BeneficiaryType) => (type: BeneficiaryType, schema: any) => {
    if (requiredType === type) {
      switch (type) {
        case "endowment":
        case "index fund":
          return requiredPositiveNumber;
        default: //wallet
          return requiredWalletAddr();
      }
    } else {
      return schema.optional();
    }
  };

const shape: SchemaShape<EPV> = {
  ...proposalShape,
  id: requiredPositiveNumber,
  beneficiaryType: asciiSchema.required("beneficiary must be selected"),

  //beneficiaries
  wallet: asciiSchema.when(beneficiaryTypeKey, genTypeTest("wallet")),
  endowmentId: asciiSchema.when(beneficiaryTypeKey, genTypeTest("endowment")),
  indexFund: asciiSchema.when(beneficiaryTypeKey, genTypeTest("index fund")),
};
export const schema = Yup.object(shape);
