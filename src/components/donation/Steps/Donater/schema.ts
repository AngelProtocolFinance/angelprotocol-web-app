import { ObjectSchema, object, string } from "yup";
import { DonateValues } from "./types";
import { SchemaShape } from "schemas/types";
import { Country } from "types/countries";
import { tokenShape } from "schemas/shape";
import { requiredString } from "schemas/string";

export const schema = object().shape<SchemaShape<DonateValues>>({
  token: object().shape(tokenShape()),
  country: object().when("token", (val, schema: ObjectSchema<any>) =>
    val.type === "fiat"
      ? schema.shape<SchemaShape<Country>>({
          name: requiredString,
        })
      : schema.shape({ name: string() })
  ),

  //no need to validate split, restricted by slider
});
