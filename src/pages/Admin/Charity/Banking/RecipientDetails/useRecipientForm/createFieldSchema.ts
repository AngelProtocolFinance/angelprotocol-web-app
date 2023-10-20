import { AnyObject, ObjectSchema, StringSchema, object, string } from "yup";
import { Field, Group } from "../../types";
import { OptionType } from "components/Selector";
import { requiredString } from "schemas/string";

type FieldSchema = {
  key: string;
  schema:
    | StringSchema<string | undefined, AnyObject, undefined, "">
    | ObjectSchema<OptionType<string>, any, OptionType<string>, "">;
};

export default function createFieldSchema(field: Field): FieldSchema {
  const requirements = field.group[0];

  // type === "date" will be validated using `requirements.validationRegexp`
  const schema =
    requirements.type === "text" || requirements.type === "date"
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
    schema = schema.min(
      requirements.minLength,
      `Must be at least ${requirements.minLength} charasters`
    );
  }
  if (requirements.maxLength) {
    schema = schema.max(
      requirements.maxLength,
      `Must be at most ${requirements.maxLength} charasters`
    );
  }
  if (requirements.validationRegexp) {
    schema = schema.matches(
      new RegExp(requirements.validationRegexp),
      `Must be a valid ${requirements.name}`
    );
  }
  if (requirements.validationAsync) {
    const { url, params } = requirements.validationAsync;
    schema = schema.test(
      "Field's remote validation",
      `Must be a valid ${requirements.name}`,
      (val) =>
        // Apparently `params` always contains just one parameter.
        fetch(`${url}?${params[0].key}=${val}`)
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

function createOptionsTypeSchema(
  requirements: Group
): ObjectSchema<OptionType<string>, AnyObject, any, ""> {
  let schema: ObjectSchema<OptionType<string>> = object({
    label: requiredString,
    value: requiredString,
  });
  if (requirements.required) {
    schema = schema.required("required");
  }
  if (requirements.valuesAllowed) {
    schema = schema.test(
      "Allowed values",
      `Must be one of: ${requirements.valuesAllowed
        .map((x) => x.key)
        .join(", ")}`,
      (val) => !!requirements.valuesAllowed?.find((x) => val.value === x.key)
    );
  }
  return schema;
}
