import * as Yup from "yup";
import { VoteValues as VV } from "./types";
import { SchemaShape } from "schemas/types";
import { asciiSchema } from "schemas/string";

type Keys = keyof VV;
const type: Keys = "type";
const vote: Keys = "vote";

const shape: SchemaShape<VV> = {
  reason: asciiSchema.when([vote, type], (...args: any[]) => {
    const [vote, type, schema] = args as [VV["vote"], VV["type"], any];
    return type === "application" && vote === "no"
      ? schema.required("reason is required")
      : schema.optional();
  }),
};

export const schema = Yup.object(shape);
