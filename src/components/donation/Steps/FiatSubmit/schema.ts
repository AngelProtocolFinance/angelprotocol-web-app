import * as Yup from "yup";
import { FiatDonateValues } from "./types";
import { SchemaShape } from "schemas/types";

export const schema = Yup.object().shape<SchemaShape<FiatDonateValues>>({
  //no need to validate split, restricted by slider
});
