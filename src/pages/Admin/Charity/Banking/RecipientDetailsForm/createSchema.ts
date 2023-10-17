import {
  AnyObject,
  ObjectSchema,
  ObjectShape,
  StringSchema,
  object,
  string,
} from "yup";
import { AccountRequirements, AccountRequirementsField, Group } from "../types";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { OptionType } from "components/Selector";
import { requiredString } from "schemas/string";

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
            const { key, schema: fieldSchema } = createFieldShape(field);
            // react-hook-form turns dot-fields into nested objects, https://github.com/react-hook-form/react-hook-form/issues/3755#issuecomment-943408807
            objectShape[key.replace(".", "__")] = fieldSchema;
            return objectShape;
          }, {} as ObjectShape)
        );
        return schema;
      }, {} as ObjectShape)
    ),
  }) as ObjectSchema<FormValues>;
}

function createFieldShape(field: AccountRequirementsField): {
  key: string;
  schema:
    | StringSchema<string | undefined, AnyObject, undefined, "">
    | ObjectSchema<OptionType<string>, any, OptionType<string>, "">;
} {
  const requirements = field.group[0];

  const schema =
    requirements.type === "text"
      ? createStringSchema(requirements)
      : createOptionsTypeSchema(requirements);

  return {
    key: requirements.key,
    schema,
  };
}

function createStringSchema(
  requirements: Group
): StringSchema<string | undefined, AnyObject, undefined, ""> {
  let schema = string();
  if (requirements.required) {
    schema = schema.required("required");
  }
  if (requirements.minLength) {
    schema = schema.min(requirements.minLength);
  }
  if (requirements.maxLength) {
    schema = schema.max(requirements.maxLength);
  }
  if (requirements.validationRegexp) {
    schema = schema.matches(new RegExp(requirements.validationRegexp));
  }
  if (requirements.validationAsync) {
    schema = schema.test((val) =>
      fetch(
        // Seems to always be one parameter. We can update when proved otherwise
        `${requirements.validationAsync!.url}?${requirements.validationAsync
          ?.params[0].key}=${val}`
      )
        .then((res) => res.ok)
        .catch((err) => {
          console.log("Error fetching accounts requirements");
          console.log(err);
          return false;
        })
    );
  }
  return schema;
}

function createOptionsTypeSchema(requirements: Group) {
  let schema: ObjectSchema<OptionType<string>> = object({
    label: requiredString,
    value: requiredString,
  });
  if (requirements.required) {
    schema = schema.required("required");
  }
  if (requirements.valuesAllowed) {
    schema = schema.test(
      (val) => !!requirements.valuesAllowed?.find((x) => val.value === x.key)
    );
  }
  return schema;
}
