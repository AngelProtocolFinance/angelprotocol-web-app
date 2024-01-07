import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { Group } from "types/aws";

type Props = {
  fields: Group[];
  currency: string;
  amount: number;
  type: string;
  quoteId: string;
};

export default function Form({ fields, currency, type }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log({ currency, type });

  return (
    <form
      onSubmit={handleSubmit(
        (fv) => console.log({ fv }),
        (err) => console.log({ err })
      )}
      className="grid gap-3"
    >
      {fields.map((f) => {
        console.log(f);
        if (f.type === "select") {
          return (
            <div key={f.key} className="grid gap-1 border border-prim p-1">
              <label htmlFor={f.key}>{f.name}</label>
              <select
                id={f.key}
                {...register(f.key, {
                  required: f.required ? "required" : false,
                })}
              >
                {f.valuesAllowed?.map((v) => (
                  <option key={v.key} value={v.key}>
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
            <div key={f.key}>
              <p>{f.name}</p>

              <div className="flex items-center gap-2">
                {f.valuesAllowed?.map((v) => (
                  <div className="flex items-center gap-1">
                    <input
                      id={`radio__${v.key}`}
                      type="radio"
                      value={v.key}
                      {...register(f.key, {
                        required: f.required ? "required" : false,
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
                className="text-red text-xs"
              />
            </div>
          );
        }

        if (f.type === "text") {
          return (
            <div key={f.key} className="grid gap-1 border border-prim p-1">
              <label htmlFor={f.key}>{f.name}</label>
              <input
                className="w-full"
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
                })}
              />
              <ErrorMessage
                errors={errors}
                name={f.key}
                as="p"
                className="text-red text-xs"
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
