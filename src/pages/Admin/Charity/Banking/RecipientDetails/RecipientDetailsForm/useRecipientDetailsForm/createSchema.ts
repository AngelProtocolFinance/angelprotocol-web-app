import { ObjectSchema, ObjectShape, object } from "yup";
import { FormValues } from "../../types";
import { SchemaShape } from "schemas/types";
import { AccountRequirements, Group } from "types/aws";
import { isEmpty } from "helpers";
import { requiredString } from "schemas/string";
import { undot } from "../../helpers";
import {
  createOptionsTypeSchema,
  createStringSchema,
} from "./createFieldSchema";

export default function createSchema(
  accountRequirements: AccountRequirements
): ObjectSchema<FormValues> {
  return object<any, SchemaShape<FormValues>>({
    currency: requiredString,
    accountHolderName: requiredString,
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
      : createOptionsTypeSchema(requirements);

  return schema;
}
