import { useFormContext } from "react-hook-form";
import { useGetter } from "store/accessors";
import Field from "./Field";
import Status from "../Status";
import { Values } from "./types";
import Fee from "../Fee";
import useCreatePoll from "./useCreatePoll";

export default function PollerForm() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<Values>();
  const createPoll = useCreatePoll();
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  return (
    <form
      onSubmit={handleSubmit(createPoll)}
      className="bg-white grid p-4 rounded-md w-full"
      autoComplete="off"
    >
      <Status />
      <Field id="title" label="Title" />
      <Field id="description" label="Description" wide />
      <Field id="link" label="Link" />
      <Field id="amount" label="Halo deposit" frozen />
      <Fee />
      <button
        disabled={isSubmitting || form_loading || !!form_error}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {form_loading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
