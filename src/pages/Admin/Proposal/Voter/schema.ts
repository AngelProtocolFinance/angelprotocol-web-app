import { ObjectSchema, object, string } from "yup";
import { VoteValues as VV } from "./types";
import { SchemaShape } from "schemas/types";

type Keys = keyof VV;
const type: Keys = "type";
const vote: Keys = "vote";

export const schema = object<any, SchemaShape<VV>>({
  reason: string().when([vote, type], (values, schema) => {
    const [vote, type] = values as [VV["vote"], VV["type"]];
    return type === "application" && vote === "no"
      ? schema.required("reason is required")
      : schema.optional();
  }),
}) as ObjectSchema<VV>;
