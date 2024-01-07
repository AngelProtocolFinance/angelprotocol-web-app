import { ErrorMessage } from "@hookform/error-message";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useForm } from "react-hook-form";
import { Group } from "types/aws";
import {
  useCreateRecipientMutation,
  useNewRequirementsMutation,
} from "services/aws/wise";
import { Label } from "components/form";

type Props = {
  fields: Group[];
  currency: string;
  amount: number;
  type: string;
  quoteId: string;
  disabled?: boolean;
};

type ValidationError = {
  code: string;
  message: string;
  arguments: string[]; //key, value
};

type ValidationContent = {
  errors: ValidationError[];
};

export default function Form({
  fields,
  currency,
  type,
  quoteId,
  amount,
  disabled,
}: Props) {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    setFocus,
    formState: { errors },
  } = useForm({ disabled });

  const [updateRequirements] = useNewRequirementsMutation();
  const [createRecipient] = useCreateRecipientMutation();

  async function refresh() {
    const { accountHolderName, ...details } = getValues();
    await updateRequirements({
      quoteId,
      amount,
      currency,
      request: {
        accountHolderName,
        currency,
        ownedByCustomer: false,
        profile: "{{profileId}}",
        type,
        details,
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit(
        async (fv) => {
          const { accountHolderName, ...details } = fv;

          const res = await createRecipient({
            accountHolderName,
            currency,
            ownedByCustomer: false,
            profile: "{{profileId}}",
            type,
            details,
          });

          if ("error" in res) {
            const error = res.error as FetchBaseQueryError;
            if (error.status === 422) {
              const content = error.data as ValidationContent;

              for (const err of content.errors) {
                const [name] = err.arguments;
                setError(name, { message: err.message });
              }
              //only focus on first error
              const [name] = content.errors[0].arguments;
              return setFocus(name);
            }
          }
        },
        (err) => console.log({ err })
      )}
      className="grid gap-5 text-gray-d2"
    >
      {fields.map((f) => {
        const labelRequired = f.required ? true : undefined;
        if (f.type === "select") {
          return (
            <div key={f.key} className="">
              <Label required={labelRequired} htmlFor={f.key} className="mb-1">
                {f.name}
              </Label>
              <select
                {...register(f.key, {
                  required: f.required ? "required" : false,
                  onChange: f.refreshRequirementsOnChange ? refresh : undefined,
                  shouldUnregister: true,
                })}
                aria-required={f.required}
                id={f.key}
                className="field-input"
              >
                {f.valuesAllowed?.map((v) => (
                  <option key={v.key} value={v.key} className="font-work">
                    {v.name}
                  </option>
                ))}
              </select>
              <ErrorMessage
                errors={errors}
                name={f.key}
                as="p"
                className="text-red text-xs -mb-5"
              />
            </div>
          );
        }

        if (f.type === "radio") {
          return (
            <div key={f.key} className="grid gap-1">
              <Label required={labelRequired} className="mb-1">
                {f.name}
              </Label>
              <div className="flex items-center gap-2">
                {f.valuesAllowed?.map((v) => (
                  <div
                    key={v.key}
                    className="relative border border-prim rounded px-4 py-3.5 text-sm has-[:checked]:border-orange has-[:disabled]:bg-gray-l5 w-32 h-10 focus-within:ring-1 focus-within:ring-gray-d1"
                  >
                    <input
                      className="appearance none w-0 h-0"
                      id={`radio__${v.key}`}
                      type="radio"
                      value={v.key}
                      {...register(f.key, {
                        required: f.required ? "required" : false,
                        onChange: f.refreshRequirementsOnChange
                          ? refresh
                          : undefined,
                        shouldUnregister: true,
                      })}
                    />
                    <label
                      htmlFor={`radio__${v.key}`}
                      className="absolute inset-0 w-full grid place-items-center"
                    >
                      {v.name}
                    </label>
                  </div>
                ))}
              </div>
              <ErrorMessage
                errors={errors}
                name={f.key}
                as="p"
                className="text-red text-xs justify-self-end -mb-5"
              />
            </div>
          );
        }

        if (f.type === "text") {
          return (
            <div key={f.key} className="grid gap-1">
              <Label required={labelRequired} htmlFor={f.key}>
                {f.name}
              </Label>
              <input
                className="field-input"
                type="text"
                placeholder={f.example}
                {...register(f.key, {
                  required: f.required ? "required" : false,
                  maxLength: f.maxLength
                    ? {
                        value: f.maxLength,
                        message: `max ${f.maxLength} chars`,
                      }
                    : undefined,
                  minLength: f.minLength
                    ? {
                        value: f.minLength,
                        message: `min ${f.minLength} chars`,
                      }
                    : undefined,
                  pattern: f.validationRegexp
                    ? {
                        value: new RegExp(f.validationRegexp),
                        message: "invalid",
                      }
                    : undefined,

                  validate: f.validationAsync
                    ? async (v: string) => {
                        const { params, url } = f.validationAsync!;
                        const res = await fetch(`${url}?${params[0].key}=${v}`);
                        return res.ok || "invalid";
                      }
                    : undefined,
                  //onBlur only as text input changes rapidly
                  onBlur: f.refreshRequirementsOnChange ? refresh : undefined,
                  shouldUnregister: true,
                })}
              />
              <ErrorMessage
                errors={errors}
                name={f.key}
                as="p"
                className="text-red text-xs justify-self-end -mb-5"
              />
            </div>
          );
        }

        if (f.type === "date") {
          return (
            <div key={f.key} className="grid gap-1">
              <Label required={labelRequired} htmlFor={f.key}>
                {f.name}
              </Label>
              <input
                className="w-full p-3 rounded border border-prim"
                type="text"
                placeholder={f.example}
                {...register(f.key, {
                  required: f.required ? "required" : false,
                  pattern: f.validationRegexp
                    ? {
                        value: new RegExp(f.validationRegexp),
                        message: `format ${f.example}`,
                      }
                    : undefined,
                  validate: f.validationAsync
                    ? async (v: string) => {
                        const { params, url } = f.validationAsync!;
                        const res = await fetch(`${url}?${params[0].key}=${v}`);
                        return res.ok || "invalid";
                      }
                    : undefined,
                  //onBlur only as text input changes rapidly
                  onBlur: f.refreshRequirementsOnChange ? refresh : undefined,
                  shouldUnregister: true,
                })}
              />
              <ErrorMessage
                errors={errors}
                name={f.key}
                as="p"
                className="text-red text-xs justify-self-end -mb-5"
              />
            </div>
          );
        }

        return (
          <div className="bg-red" key={f.key}>
            {f.name}
          </div>
        );
      })}
      <button type="submit">submit</button>
    </form>
  );
}
