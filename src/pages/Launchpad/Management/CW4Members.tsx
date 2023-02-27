import { ErrorMessage } from "@hookform/error-message";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "components/form";

const defaultValue = { addr: "", weight: 1 };
const name = "members";

export default function CW4Members() {
  const { register, trigger } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name,
  });

  async function handleAppend() {
    append(defaultValue);
    await trigger();
  }
  function handleRemove(index: number) {
    return async function () {
      remove(index);
      await trigger();
    };
  }

  return (
    <div className="mb-8 grid content-start">
      {fields.map((field, i) => (
        <div
          className="relative mb-7 grid grid-cols-[1fr_4rem] items-center gap-4"
          key={field.id}
        >
          <div className="grid w-full">
            <Label className="mb-2" htmlFor={`${name}.${i}.addr`} required>
              Wallet address
            </Label>
            <input
              {...register(`${name}.${i}.addr`)}
              key={field.id} // important to include key with field's id
            />
          </div>
          <div className="grid">
            <Label className="mb-2" htmlFor={`${name}.${i}.weight`} required>
              Weight
            </Label>
            <input
              {...register(`${name}.${i}.weight`)}
              key={field.id} // important to include key with field's id
            />
          </div>
          {i !== 0 && (
            <button
              type="button"
              className="absolute -right-8"
              onClick={handleRemove(i)}
            >
              --
            </button>
          )}
          <ErrorMessage
            name={`${name}.${i}.addr`}
            as="p"
            className="absolute -bottom-5 text-xs text-rose-400"
          />
          <ErrorMessage
            name={`${name}.${i}.weight`}
            as="p"
            className="absolute -bottom-5 right-0 text-xs text-rose-400"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleAppend}
        className="flex items-center gap-2 justify-self-end text-xs uppercase"
      >
        add another member
      </button>
    </div>
  );
}
