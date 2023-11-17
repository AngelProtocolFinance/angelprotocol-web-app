import { ObjectSchema, ObjectShape, object } from "yup";
import { FormValues } from "../../types";
import { SchemaShape } from "schemas/types";
import { AccountRequirements, Group } from "types/aws";
import { Country } from "types/components";
import { isEmpty } from "helpers";
import { fileDropzoneAssetShape } from "schemas/file";
import { requiredString } from "schemas/string";
import { BYTES_IN_MB } from "constants/common";
import { isCountry, undot } from "../../helpers";
import { MB_LIMIT, VALID_MIME_TYPES } from "../constants";
import {
  createOptionsTypeSchema,
  createStringSchema,
} from "./createFieldSchema";

export default function createSchema(
  accountRequirements: AccountRequirements
): ObjectSchema<FormValues> {
  return object<any, SchemaShape<FormValues>>({
    bankStatementFile: fileDropzoneAssetShape(
      MB_LIMIT * BYTES_IN_MB,
      VALID_MIME_TYPES,
      true
    ),
    currency: requiredString,
    type: requiredString,
    requirements: object(
      accountRequirements.fields.reduce<ObjectShape>((objectShape, field) => {
        field.group.forEach((requirements) => {
          objectShape[undot(requirements.key)] = getSchema(requirements);
        });
        return objectShape;
      }, {})
    ),
  }) as ObjectSchema<FormValues>;
}

function getSchema(requirements: Group) {
  // type === "date" will be validated using `requirements.validationRegexp`
  const schema =
    requirements.type === "text" || requirements.type === "date"
      ? createStringSchema(requirements)
      : // if by some error on Wise's side there are no valuesAllowed provided for a requirement,
      // we will it as a "text" field
      isEmpty(requirements.valuesAllowed ?? [])
      ? createStringSchema(requirements)
      : // country-related requirements need to be converted into `type Country`-like objects
      isCountry(requirements)
      ? object<any, SchemaShape<Country>>({
          name: requiredString,
          code: requiredString.max(
            2,
            "Country code should contain 2 characters"
          ),
        })
      : createOptionsTypeSchema(requirements);

  return schema;
}
