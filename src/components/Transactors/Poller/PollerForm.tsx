import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useGetter, useSetter } from "store/accessors";
import { createPoll } from "services/transaction/transactors/createPoll";
import Field from "./Field";
import useEstimator from "./useEstimator";
import Status from "../Status";
import Fee from "../Fee";
import { CreatePollValues } from "./types";

export default function PollerForm() {
  const {
    handleSubmit,
    formState: { isValid, isDirty },
  } = useFormContext<CreatePollValues>();

  const dispatch = useSetter();
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const { wallet } = useEstimator();

  const _createPoll = useCallback(
    (data: CreatePollValues) => {
      dispatch(createPoll({ wallet, createPollValues: data }));
    },
    [wallet]
  );

  return (
    <form
      onSubmit={handleSubmit(_createPoll)}
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
        disabled={form_loading || !!form_error || !isValid || !isDirty}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {form_loading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
