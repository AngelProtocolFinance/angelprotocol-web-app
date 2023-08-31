import { ObjectSchema, number, object, string } from "yup";
import { FormValues as FV } from "./types";
import { SchemaShape as SS } from "schemas/types";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";
import { proposalShape } from "../../../../constants";

type TBeneficiaryType = FV["beneficiaryType"];
const beneficiaryTypeKey: keyof FV = "beneficiaryType";

export const schema = object<any, SS<FV>>({
  ...proposalShape,
  beneficiaryWallet: string().when(
    [beneficiaryTypeKey],
    ([beneficiaryType], schema) => {
      return (beneficiaryType as TBeneficiaryType) === "wallet"
        ? requiredWalletAddr(chainIds.polygon)
        : schema;
    }
  ),
  beneficiaryEndowmentId: number().when(
    [beneficiaryTypeKey],
    ([beneficiaryType], schema) => {
      return (beneficiaryType as TBeneficiaryType) === "endowment"
        ? schema
            .typeError("invalid number")
            .positive("must be greater than 0")
            .integer("must be whole number")
        : string();
    }
  ),
}) as ObjectSchema<FV>;
