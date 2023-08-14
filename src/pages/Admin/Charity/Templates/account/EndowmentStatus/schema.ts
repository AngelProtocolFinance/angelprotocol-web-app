import { ObjectSchema, StringSchema, object, string } from "yup";
import { EndowmentUpdateValues as EPV } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredPositiveNumber } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { proposalShape } from "../../../../constants";

type BeneficiaryType = EPV["beneficiaryType"];
const beneficiaryTypeKey: keyof EPV = "beneficiaryType";

const genTypeTest =
  (requiredType: BeneficiaryType) => (values: any[], schema: StringSchema) => {
    const [type] = values as [BeneficiaryType];
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

export const schema = object<any, SchemaShape<EPV>>({
  ...proposalShape,
  id: requiredPositiveNumber,
  beneficiaryType: string().required("beneficiary must be selected"),

  //beneficiaries
  wallet: string().when(beneficiaryTypeKey, genTypeTest("wallet")),
  endowmentId: string().when(beneficiaryTypeKey, genTypeTest("endowment")),
  indexFund: string().when(beneficiaryTypeKey, genTypeTest("index fund")),
}) as ObjectSchema<EPV>;
