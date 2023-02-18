import {
  SchemaShape,
  requiredPositiveNumber,
  requiredWalletAddr,
} from "@ap/schemas";
import * as Yup from "yup";
import { EndowmentUpdateValues as EPV } from "@/pages/Admin/types";
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
  beneficiaryType: Yup.string().required("beneficiary must be selected"),

  //beneficiaries
  wallet: Yup.string().when(beneficiaryTypeKey, genTypeTest("wallet")),
  endowmentId: Yup.string().when(beneficiaryTypeKey, genTypeTest("endowment")),
  indexFund: Yup.string().when(beneficiaryTypeKey, genTypeTest("index fund")),
};
export const schema = Yup.object(shape);
