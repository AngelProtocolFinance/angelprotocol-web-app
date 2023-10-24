import { ObjectSchema, ObjectShape, object } from "yup";
import { FormValues } from "../../types";
import { SchemaShape } from "schemas/types";
import { AccountRequirements } from "types/aws";
import { requiredString } from "schemas/string";
import { undot } from "../../dot";
import createFieldSchema from "./createFieldSchema";

export default function createSchema(
  accountRequirements: AccountRequirements
): ObjectSchema<FormValues> {
  return object<any, SchemaShape<FormValues>>({
    currency: requiredString,
    accountHolderName: requiredString,
    type: requiredString,
    requirements: object(
      accountRequirements.fields.reduce((objectShape, field) => {
        const { key, schema: fieldSchema } = createFieldSchema(field);
        objectShape[undot(key)] = fieldSchema;
        return objectShape;
      }, {} as ObjectShape)
    ),
  }) as ObjectSchema<FormValues>;
}
