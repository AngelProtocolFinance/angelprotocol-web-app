import { ObjectSchema, ObjectShape, object } from "yup";
import { AccountRequirements } from "../../types";
import { FormValues } from "../types";
import { SchemaShape } from "schemas/types";
import { requiredString } from "schemas/string";
import createFieldSchema from "./createFieldSchema";

export default function createSchema(
  accountRequirementsArray: AccountRequirements[]
): ObjectSchema<FormValues> {
  return object<any, SchemaShape<FormValues>>({
    currency: requiredString,
    accountHolderName: requiredString,
    requirements: object(
      accountRequirementsArray.reduce((schema, accountRequirements) => {
        schema[accountRequirements.type] = object(
          accountRequirements.fields.reduce((objectShape, field) => {
            const { key, schema: fieldSchema } = createFieldSchema(field);
            // `react-hook-form` turns dot-fields into nested objects, causing weird behavior.
            // To solve, turn dots into some other character https://github.com/react-hook-form/react-hook-form/issues/3755#issuecomment-943408807
            objectShape[key.replace(".", "__")] = fieldSchema;
            return objectShape;
          }, {} as ObjectShape)
        );
        return schema;
      }, {} as ObjectShape)
    ),
  }) as ObjectSchema<FormValues>;
}
