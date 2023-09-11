import { ObjectSchema, number, object, string } from "yup";
import { FormValues as FV } from "./types";
import { SchemaShape as SS } from "schemas/types";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";
import { proposalShape } from "../../../../constants";

type TBeneficiaryType = FV["beneficiaryType"];
type TMeta = FV["meta"];
const beneficiaryTypeKey: keyof FV = "beneficiaryType";
const metaKey: keyof FV = "meta";

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
    [beneficiaryTypeKey, metaKey],
    (values, schema) => {
      const [beneficiaryType, meta] = values as [TBeneficiaryType, TMeta];
      return beneficiaryType === "endowment"
        ? schema
            .typeError("invalid ID")
            .positive("must be greater than 0")
            .integer("must be whole number")
            .notOneOf([meta.endowId], "can't be your endowment")
        : string();
    }
  ),
}) as ObjectSchema<FV>;
