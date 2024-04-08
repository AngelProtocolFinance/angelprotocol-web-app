import { AnyObject, ObjectSchema, StringSchema, object, string } from "yup";
import { Group } from "types/aws";
import { OptionType } from "types/components";
import { logger } from "helpers";
import { requiredString } from "schemas/string";
import { IS_TEST } from "constants/env";
import { APIs } from "constants/urls";

const wiseProxy = `${APIs.aws}/${IS_TEST ? "staging" : "v1"}/wise-proxy`;

export function createStringSchema(
  requirements: Group
): StringSchema<string | undefined | null, AnyObject, undefined, ""> {
  let schema = requirements.required ? requiredString : string().nullable();

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
    schema = schema.matches(new RegExp(requirements.validationRegexp), {
      message: `Must be a valid ${requirements.name}`,
      excludeEmptyString: true,
    });
  }
  if (requirements.validationAsync) {
    const { url, params } = requirements.validationAsync;
    const path = new URL(url).pathname;
    const proxiedURL = wiseProxy + path;
    schema = schema.test(
      "Field's remote validation",
      `Must be a valid ${requirements.name}`,
      (val) =>
        // Still waiting on some response from Wise Support on how to handle
        // cases when params.length > 1, as it's currently not clear how do this.
        fetch(`${proxiedURL}?${params[0].key}=${val}`)
          .then((res) => res.ok)
          .catch((err) => {
            logger.error("Error fetching accounts requirements");
            logger.error(err);
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
