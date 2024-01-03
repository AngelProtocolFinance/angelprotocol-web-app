import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { Group } from "types/aws";

type Props = { fields: Group[] };

export default function Form({ fields }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
                  <option value={v.key}>{v.name}</option>
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
