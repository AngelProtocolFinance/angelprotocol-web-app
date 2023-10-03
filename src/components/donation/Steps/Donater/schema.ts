import { ObjectSchema, object, string } from "yup";
import { DonateValues as DV } from "./types";
import { SchemaShape } from "schemas/types";
import { Country } from "types/countries";
import { TokenWithAmount } from "types/tx";
import { tokenShape } from "schemas/shape";
import { requiredString } from "schemas/string";

export const schema = object<any, SchemaShape<DV>>({
  token: object(tokenShape()),
  country: object().when("token", ([val], schema) =>
    (val as TokenWithAmount).type === "fiat"
      ? schema.shape<SchemaShape<Country>>({
          name: requiredString,
        })
      : schema.shape({ name: string() })
  ),

  //no need to validate split, restricted by slider
}) as ObjectSchema<DV>;
