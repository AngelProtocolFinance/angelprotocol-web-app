import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import Fields from "./Fields";

export default function Form() {
  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = useFormContext<FormValues>();

  return (
    <form
      className="grid content-start text-zinc-50/80 p-3 bg-zinc-50/5 shadow-inner"
      onSubmit={handleSubmit(() => {})}
    >
      <Fields classes="mt-4" />

      <button
        disabled={!isDirty || !isValid}
        type="submit"
        className="font-heading justify-self-end text-xs font-bold px-4 py-2 bg-sky-500 disabled:bg-zinc-300 hover:bg-sky-400 uppercase rounded-md text-zinc-50"
      >
        Submit order
      </button>
    </form>
  );
}
