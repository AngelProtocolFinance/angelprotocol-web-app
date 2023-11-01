import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import { AccountRequirements, CreateRecipientRequest } from "types/aws";
import LoaderRing from "components/LoaderRing";
import { redot } from "../helpers/dot";
import RequirementField from "./RequirementField";

type Props = {
  accountRequirements: AccountRequirements;
  disabled: boolean;
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
    <form onSubmit={handleSubmission}>
      <fieldset
        aria-disabled={props.disabled}
        disabled={props.disabled}
        className="grid gap-6"
      >
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
            <button
              disabled={isSubmitting}
              type="submit"
              className="px-6 btn-orange text-sm w-80"
            >
              {isSubmitting ? (
                <>
                  <LoaderRing thickness={10} classes="w-6" /> Checking
                  additional requirements...
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
            className="px-6 btn-orange text-sm w-80"
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
      </fieldset>
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
      const origKey = redot(key);
      if (typeof value === "string") {
        // if value is string
        details[origKey] = value;
      } else if ("code" in value) {
        // if value is Country
        details[origKey] = value.code;
      } else {
        // if value is OptionType
        details[origKey] = value.value;
      }
      return details;
    }, {}),
  };
}
