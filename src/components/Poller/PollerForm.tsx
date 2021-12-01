import Field from "./Field";
import Status from "./Status";
import { useFormContext } from "react-hook-form";
import { Values } from "components/Donater/types";
import Fee from "./Fee";
import useSubmit from "./useSubmit";

export default function PollerForm() {
  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useFormContext<Values>();
  const sender = useSubmit();
  const loading = watch("loading");
  const error = watch("form_error");
  return (
    <form
      onSubmit={handleSubmit(sender)}
      className="bg-white grid p-4 rounded-md w-96"
      autoComplete="off"
    >
      <Status />
      <Field id="title" label="Title" />
      <Field id="description" label="Description" wide />
      <Field id="link" label="Link" />
      <Field id="amount" label="Halo deposit" frozen />
      <Fee />
      <button
        disabled={isSubmitting || loading || !!error}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {loading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
