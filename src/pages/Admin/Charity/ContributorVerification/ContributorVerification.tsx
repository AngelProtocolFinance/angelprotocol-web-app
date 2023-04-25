import { FormProvider, useForm } from "react-hook-form";
import { useModalContext } from "contexts/ModalContext";
import { Radio } from "components/form";
import ChangeSettingsPrompt from "./ChangeSettingsPrompt";
import { FormValues } from "./schema";

export default function ContributorVerification() {
  const methods = useForm<FormValues>({
    defaultValues: {
      contributor_verification_required: "true",
    },
  });

  const { showModal } = useModalContext();

  const handleChange = () =>
    showModal(ChangeSettingsPrompt, {
      children: (
        <FormProvider {...methods}>
          <div className="flex flex-col justify-center gap-4 px-8 py-12">
            <Radio<FormValues, "contributor_verification_required">
              name="contributor_verification_required"
              value="false"
              classes={{ container: "px-4 py-3 border border-prim rounded" }}
            >
              Contributors <b>are</b> able to donate anonymously. Contributor
              verification <b>is not</b> enforced.
            </Radio>
            <Radio<FormValues, "contributor_verification_required">
              name="contributor_verification_required"
              value="true"
              classes={{ container: "px-4 py-3 border border-prim rounded" }}
            >
              Contributors <b>aren't</b> able to donate anonymously. Contributor
              verification <b>is</b> enforced.
            </Radio>
          </div>
        </FormProvider>
      ),
    });

  return (
    <form
      className="grid gap-8"
      onSubmit={methods.handleSubmit((formValues) =>
        console.log("submitted", formValues)
      )}
      onReset={() => methods.reset()}
    >
      <h2 className="font-bold text-3xl">Other settings</h2>
      <div className="flex flex-col items-start gap-8 p-8 border border-prim rounded dark:bg-blue-d6">
        <span className="font-bold text-2xl">Contributor Verification</span>
        <div className="flex justify-between items-center w-full px-4 py-3 border border-prim rounded bg-gray-l6 dark:bg-blue-d5">
          <span>
            Contributors <b>aren't</b> able to donate anonymously. Contributor
            verification <b>is</b> enforced.
          </span>
          <button
            type="button"
            className="btn-outline-filled w-32 h-10 text-sm"
            onClick={handleChange}
          >
            Change
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button type="reset" className="btn-outline-gray w-44 h-12 text-sm">
            Reset changes
          </button>
          <button type="submit" className="btn-outline-gray w-44 h-12 text-sm">
            Submit changes
          </button>
        </div>
      </div>
    </form>
  );
}
