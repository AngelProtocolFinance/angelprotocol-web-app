import { boolean, lazy, object, ref, string } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { positiveNumberConstraint } from "schemas/number";
import { proposalShape } from "../../../constants";

const shape: SchemaShape<FormValues> = {
  ...proposalShape,
  threshold: lazy((val) =>
    val === ""
      ? string().required("required")
      : positiveNumberConstraint.max(
          ref("$members"),
          "should not be greater than number of members"
        )
  ),
  requireExecution: boolean(),
};

export const schema = object(shape);
