import * as Yup from "yup";
import { VoteValues as VV } from "./types";
import { SchemaShape } from "schemas/types";

type Keys = keyof VV;
const type: Keys = "type";
const vote: Keys = "vote";

const shape: SchemaShape<VV> = {
  reason: Yup.string().when([vote, type], (values, schema) => {
    const [vote, type] = values as [VV["vote"], VV["type"]];
    return type === "application" && vote === "no"
      ? schema.required("reason is required")
      : schema.optional();
  }),
};

export const schema = Yup.object(shape);
