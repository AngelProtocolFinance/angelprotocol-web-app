import { tokenShape } from "@/schemas/shape";
import * as Yup from "yup";
import { DonateValues } from "./types";
import { SchemaShape } from "@/schemas/types";

export const schema = Yup.object().shape<SchemaShape<DonateValues>>({
  token: Yup.object().shape(tokenShape),
  //no need to validate split, restricted by slider
});
