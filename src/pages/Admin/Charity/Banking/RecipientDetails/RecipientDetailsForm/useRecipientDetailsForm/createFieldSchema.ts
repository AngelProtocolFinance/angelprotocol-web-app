import { AnyObject, ObjectSchema, StringSchema, object, string } from "yup";
import { Group } from "types/aws";
import { OptionType } from "components/Selector";
import { requiredString } from "schemas/string";

export function createStringSchema(
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

export function createOptionsTypeSchema(
  requirements: Group
): ObjectSchema<OptionType<string | undefined>, AnyObject, any, ""> {
  // - since we'll have allowed values set in the component itself, there's only need to check whether the field is required
  // - other validations make no sense for selectors ([min/max]Length, validationRegexp etc.)
  const schema: ObjectSchema<OptionType<string | undefined>> = object({
    label: requiredString,
    value: requirements.required ? requiredString : string(),
  });

  return schema;
}
