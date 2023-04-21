import * as Yup from "yup";
import { FiatDonateValues } from "./types";
import { SchemaShape } from "schemas/types";
import { Country } from "types/countries";
import { requiredString } from "schemas/string";

export const schema = Yup.object().shape<SchemaShape<FiatDonateValues>>({
  country: Yup.object().shape<SchemaShape<Country>>({
    name: requiredString,
  }),
});
