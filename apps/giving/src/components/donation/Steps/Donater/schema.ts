import { SchemaShape, tokenShape } from "@ap/schemas";
import * as Yup from "yup";
import { DonateValues } from "./types";

export const schema = Yup.object().shape<SchemaShape<DonateValues>>({
  token: Yup.object().shape(tokenShape),
  //no need to validate split, restricted by slider
});
