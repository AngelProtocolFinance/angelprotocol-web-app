import { tokenShape } from "@giving/schemas/shape";
import * as Yup from "yup";
import { DonateValues } from "./types";
import { SchemaShape } from "@giving/schemas/types";

export const schema = Yup.object().shape<SchemaShape<DonateValues>>({
  token: Yup.object().shape(tokenShape),
  //no need to validate split, restricted by slider
});
