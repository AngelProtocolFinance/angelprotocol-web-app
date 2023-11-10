import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import { AccountRequirements, CreateRecipientRequest } from "types/aws";
import LoaderRing from "components/LoaderRing";
import { redot } from "../dot";
import RequirementField from "./RequirementField";

type Props = {
  accountRequirements: AccountRequirements;
  refreshRequired: boolean;
  onRefresh: (request: CreateRecipientRequest) => void;
  onSubmit: (request: CreateRecipientRequest) => void;
};

export default function Form(props: Props) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  const handleSubmission = handleSubmit((formValues) => {
    const request = convertToCreateRecipientRequest(formValues);
    if (props.refreshRequired) {
      props.onRefresh(request);
    } else {
      props.onSubmit(request);
    }
  });

  return (
    <form onSubmit={handleSubmission} className="grid gap-4">
      <div className="grid grid-cols-2 gap-2">
        {props.accountRequirements.fields
          .flatMap((field) => field.group)
          .map((requirements) => (
            <RequirementField key={requirements.key} data={requirements} />
          ))}
      </div>

      {props.refreshRequired ? (
        <>
          <span>
            After you fill the form, we may need additional information to be
            able to submit your bank details for validation. Please fill the
            form and click the "Check requirements" button below.
          </span>
          <button
            disabled={isSubmitting}
            type="submit"
            className="px-6 btn-red text-sm w-80"
          >
            {isSubmitting ? (
              <>
                <LoaderRing thickness={10} classes="w-6" /> Checking additional
                requirements...
              </>
            ) : (
              "Check requirements"
            )}
          </button>
        </>
      ) : (
        <button
          disabled={isSubmitting}
          type="submit"
          className="px-6 btn-red text-sm w-80"
        >
          {isSubmitting ? (
            <>
              <LoaderRing thickness={10} classes="w-6" /> Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      )}
    </form>
  );
}

function convertToCreateRecipientRequest(
  formValues: FormValues
): CreateRecipientRequest {
  return {
    accountHolderName: formValues.accountHolderName,
    currency: formValues.currency,
    type: formValues.type,
    details: Object.entries(formValues.requirements).reduce<
      CreateRecipientRequest["details"]
    >((details, [key, value]) => {
      details[redot(key)] = typeof value === "object" ? value.value : value;
      return details;
    }, {}),
  };
}
