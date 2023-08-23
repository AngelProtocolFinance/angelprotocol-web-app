import { ObjectSchema, object, string } from "yup";
import { Beneficiary, FormValues as FV } from "./types";
import { SchemaShape as SS } from "schemas/types";
import { requiredWalletAddr } from "schemas/string";
import { proposalShape } from "../../../../constants";

type BeneficiaryType = Beneficiary["type"];
const key: keyof Beneficiary = "type";

export const schema = object<any, SS<FV>>({
  ...proposalShape,
  beneficiary: object().shape<SS<Beneficiary>>({
    id: string().required("beneficiary is required"),
    type: string().when(key, ([type]) => {
      switch (type as BeneficiaryType) {
        case "endowment":
        default: //wallet
          return requiredWalletAddr();
      }
    }),
  }),
}) as ObjectSchema<FV>;
