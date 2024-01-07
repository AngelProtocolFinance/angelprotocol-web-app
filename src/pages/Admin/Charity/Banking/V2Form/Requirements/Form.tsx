import { Listbox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { Group } from "types/aws";
import { useNewRequirementsMutation } from "services/aws/wise";
import { Label } from "components/form";

type Props = {
  fields: Group[];
  currency: string;
  amount: number;
  type: string;
  quoteId: string;
};

export default function Form({
  fields,
  currency,
  type,
  quoteId,
  amount,
}: Props) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [updateRequirements] = useNewRequirementsMutation();

  async function refresh() {
    const { accountHolderName, ...details } = getValues() as any;
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
        (fv) => console.log({ fv }),
        (err) => console.log({ err })
      )}
      className="grid gap-4 font-work"
    >
      {fields.map((f) => {
        console.log(f);
        const labelRequired = f.required ? true : undefined;
        if (f.type === "select") {
          return (
            <div key={f.key} className="grid gap-1 group">
              <Label required={labelRequired} htmlFor={f.key}>
                {f.name}
              </Label>
              <select
                {...register(f.key, {
                  required: f.required ? "required" : false,
                  onChange: f.refreshRequirementsOnChange ? refresh : undefined,
                })}
                aria-required={f.required}
                id={f.key}
                className="appearance-none w-full border border-prim p-3 rounded relative after:content-['*'] after:absolute after:right-0 after:text-blue"
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
                className="text-red text-xs"
              />
            </div>
          );
        }

        if (f.type === "radio") {
          return (
            <div key={f.key} className="grid gap-1">
              <Label required={labelRequired}>{f.name}</Label>
              <div className="flex items-center gap-4 rounded border border-prim p-3">
                {f.valuesAllowed?.map((v) => (
                  <div
                    key={v.key}
                    className="flex items-center gap-1 accent-orange"
                  >
                    <input
                      id={`radio__${v.key}`}
                      type="radio"
                      value={v.key}
                      {...register(f.key, {
                        required: f.required ? "required" : false,
                        onChange: f.refreshRequirementsOnChange
                          ? refresh
                          : undefined,
                      })}
                    />
                    <label htmlFor={`radio__${v.key}`}>{v.name}</label>
                  </div>
                ))}
              </div>
              <ErrorMessage
                errors={errors}
                name={f.key}
                as="p"
                className="text-red text-xs justify-self-end -mb-4"
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
                className="w-full p-3 rounded border border-prim"
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
                })}
              />
              <ErrorMessage
                errors={errors}
                name={f.key}
                as="p"
                className="text-red text-xs justify-self-end -mb-4"
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
