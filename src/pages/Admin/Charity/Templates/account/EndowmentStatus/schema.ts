import { object, string } from "yup";
import { Beneficiary, FormValues as FV } from "./types";
import { SchemaShape as SS } from "schemas/types";
import { requiredPositiveNumber } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { proposalShape } from "../../../../constants";

type BeneficiaryType = Beneficiary["type"];
const key: keyof Beneficiary = "type";

const shape: SS<FV> = {
  ...proposalShape,
  id: requiredPositiveNumber,
  beneficiary: object().shape<SS<Beneficiary>>({
    id: string().required("beneficiary is required"),
    type: string().when(key, (type: BeneficiaryType) => {
      switch (type) {
        case "endowment":
        case "indexfund":
          return requiredPositiveNumber;
        default: //wallet
          return requiredWalletAddr();
      }
    }),
  }),
};
export const schema = object(shape);
