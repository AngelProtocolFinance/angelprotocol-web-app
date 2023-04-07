import { StringSchema, object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<FormValues> = {
  ...proposalShape,
  // to add or to remove
  address: requiredWalletAddr(chainIds.polygon).when(
    ["$members", "$action"],
    (...args: any[]) => {
      const [members, action, schema] = args as [
        string[],
        string,
        StringSchema
      ];
      return action === "add"
        ? schema.notOneOf(members, "member already exist")
        : schema;
    }
  ),
};

export const schema = object(shape);
