import { Path, RegisterOptions } from "react-hook-form";
import { Group } from "../types";
import { FormValues } from "./types";
import { OptionType } from "components/Selector";

export default function createRules(
  data: Group
):
  | Omit<
      RegisterOptions<FormValues, Path<FormValues>>,
      "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
    >
  | undefined {
  const rules: Omit<
    RegisterOptions<FormValues, Path<FormValues>>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  > = {
    required: { value: data.required, message: "required" },
    minLength: data.minLength
      ? {
          value: data.minLength,
          message: `must be at least ${data.minLength} charasters`,
        }
      : undefined,
    maxLength: data.maxLength
      ? {
          value: data.maxLength,
          message: `must be at most ${data.maxLength} charasters`,
        }
      : undefined,
    pattern: data.validationRegexp
      ? {
          value: new RegExp(data.validationRegexp),
          message: `must be a valid ${data.name}`,
        }
      : undefined,
    validate:
      data.validationAsync || data.valuesAllowed
        ? async (fieldValue) => {
            const value = getValue(fieldValue);
            if (!value) {
              return "required";
            }

            if (data.valuesAllowed) {
              if (!data.valuesAllowed?.find((x) => value === x.key)) {
                return `must be one of: ${data.valuesAllowed
                  .map((x) => x.key)
                  .join(", ")}`;
              }
            }

            if (data.validationAsync) {
              try {
                const { url, params } = data.validationAsync!;
                const res = await fetch(`${url}?${params[0].key}=${value}`);
                if (!res.ok) {
                  return `must be a valid ${data.name}`;
                }
              } catch (err) {
                console.log(err);
                return "error fetching accounts requirements";
              }
            }
          }
        : undefined,
  };

  return rules;
}

function getValue(
  formValue:
    | string
    | {
        key: string;
        value: string | OptionType<string>;
      }
    | {
        key: string;
        value: string | OptionType<string>;
      }[]
    | OptionType<string>
): string {
  if (typeof formValue === "string") {
    return formValue;
  } else if (Array.isArray(formValue)) {
    const item = Object.values(formValue)[0].value;
    return typeof item === "object" ? item.value : item;
  } else {
    return typeof formValue.value === "object"
      ? formValue.value.value
      : formValue.value;
  }
}
