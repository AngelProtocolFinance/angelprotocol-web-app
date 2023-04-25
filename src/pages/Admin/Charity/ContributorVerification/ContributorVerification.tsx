import { useForm } from "react-hook-form";
import { useModalContext } from "contexts/ModalContext";
import ChangeSettingsPrompt from "./ChangeSettingsPrompt";
import Message from "./Message";
import { FormValues } from "./schema";

export default function ContributorVerification() {
  const { handleSubmit, reset, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      contributor_verification_required: "true",
    },
  });

  const { showModal } = useModalContext();

  const contributor_verification_required = watch(
    "contributor_verification_required"
  );

  const handleChange = () =>
    showModal(ChangeSettingsPrompt, {
      currentValue: contributor_verification_required,
      onChange: (value) => setValue("contributor_verification_required", value),
    });

  return (
    <form
      className="grid gap-8"
      onReset={() => reset()}
      onSubmit={handleSubmit((formValues) =>
        console.log(
          "submitted",
          formValues,
          typeof formValues.contributor_verification_required
        )
      )}
    >
      <h2 className="font-bold text-3xl">Other settings</h2>
      <div className="flex flex-col items-start gap-8 p-8 border border-prim rounded dark:bg-blue-d6">
        <span className="font-bold text-2xl">Contributor Verification</span>
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 w-full px-4 py-3 border border-prim rounded bg-gray-l6 dark:bg-blue-d5">
          <Message verification_required={contributor_verification_required} />
          <button
            type="button"
            className="btn-outline-filled w-full md:w-32 h-10 text-sm"
            onClick={handleChange}
          >
            Change
          </button>
        </div>
        <div className="flex justify-start gap-3 w-full">
          <button
            type="reset"
            className="btn-outline-gray grow max-w-[11rem] h-12 text-sm"
          >
            Reset
          </button>
          <button type="submit" className="btn-outline-gray w-44 h-12 text-sm">
            Submit changes
          </button>
        </div>
      </div>
    </form>
  );
}
