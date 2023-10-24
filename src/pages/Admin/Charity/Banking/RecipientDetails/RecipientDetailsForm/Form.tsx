import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import { AccountRequirements, CreateRecipientRequest } from "types/aws";
import LoaderRing from "components/LoaderRing";
import { redot } from "../dot";
import RequirementField from "./RequirementField";

type Props = {
  accountRequirements: AccountRequirements;
  onSubmit: (request: CreateRecipientRequest) => void;
};

export default function Form(props: Props) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  const onSubmit = handleSubmit(async (formValues) => {
    const request = convertToCreateRecipientRequest(formValues);
    props.onSubmit(request);
  });

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid grid-cols-2 gap-2">
        {props.accountRequirements.fields.map((field) => {
          const data = field.group[0]; // seems that `field.group.length === 1` in all cases
          return <RequirementField key={data.key} data={data} />;
        })}
      </div>

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
          "Save"
        )}
      </button>
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
