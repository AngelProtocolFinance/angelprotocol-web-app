import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import { AccountRequirements, CreateRecipientRequest } from "types/aws";
import LoaderRing from "components/LoaderRing";
import RequirementField from "./RequirementField";
import formToCreateRecipientRequest from "./formToCreateRecipientRequest";

type Props = {
  accountRequirements: AccountRequirements;
  disabled: boolean;
  refreshRequired: boolean;
  onRefresh: (request: CreateRecipientRequest) => void;
  onSubmit: (request: CreateRecipientRequest) => void;
};

export default function Form(props: Props) {
  const { handleSubmit } = useFormContext<FormValues>();

  const handleSubmission = handleSubmit((formValues) => {
    const request = formToCreateRecipientRequest(formValues);
    if (props.refreshRequired) {
      props.onRefresh(request);
    } else {
      props.onSubmit(request);
    }
  });

  return (
    <form onSubmit={handleSubmission} className="grid gap-6">
      {props.accountRequirements.fields
        .flatMap((field) => field.group)
        .map((requirements) => (
          <RequirementField
            key={requirements.key}
            data={requirements}
            disabled={props.disabled}
          />
        ))}

      {props.refreshRequired ? (
        <>
          <span>
            After you fill the form, we may need additional information to be
            able to submit your bank details for validation. Please fill the
            form and click the "Check requirements" button below.
          </span>
          <SubmitButton text="Check Requirements" loadingText="Checking..." />
        </>
      ) : (
        <SubmitButton text="Submit" loadingText="Submitting..." />
      )}
    </form>
  );
}

function SubmitButton(props: { text: string; loadingText: string }) {
  const {
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  return (
    <button
      disabled={isSubmitting}
      type="submit"
      className="px-6 btn-orange gap-1 text-sm w-80"
    >
      {isSubmitting ? (
        <>
          <LoaderRing
            thickness={10}
            classes={{ container: "w-4", ringToColor: "to-white" }}
          />{" "}
          {props.loadingText}
        </>
      ) : (
        props.text
      )}
    </button>
  );
}
