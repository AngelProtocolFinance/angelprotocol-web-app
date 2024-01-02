import { useForm } from "react-hook-form";
import { Group } from "types/aws";

type Props = { fields: Group[] };

export default function Form({ fields }: Props) {
  const { register } = useForm();

  return (
    <form className="grid gap-3">
      {fields.map((f) => {
        if (f.type === "select") {
          return (
            <div key={f.key} className="grid gap-1 border border-prim p-1">
              <label htmlFor={f.key}>{f.name}</label>
              <select id={f.key} {...register(f.key, { required: f.required })}>
                {f.valuesAllowed?.map((v) => (
                  <option value={v.key}>{v.name}</option>
                ))}
              </select>
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
                  required: f.required,
                  maxLength: f.maxLength || undefined,
                  minLength: f.minLength || undefined,
                  pattern: f.validationRegexp
                    ? new RegExp(f.validationRegexp)
                    : undefined,
                })}
              />
            </div>
          );
        }

        return <div key={f.key}>{f.name}</div>;
      })}
    </form>
  );
}
