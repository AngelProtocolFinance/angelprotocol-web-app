import Fee from "../Fee";
import Status from "../Status";
import Field from "./Field";
import useCreatePoll from "./useCreatePoll";

export default function PollerForm() {
  const { createPoll, isSubmitDisabled, isFormLoading } = useCreatePoll();
  return (
    <form
      onSubmit={createPoll}
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
        disabled={isSubmitDisabled}
        className="bg-orange disabled:bg-grey-accent p-3 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {isFormLoading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
