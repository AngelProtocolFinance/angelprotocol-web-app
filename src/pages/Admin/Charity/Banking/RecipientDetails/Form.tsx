import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { AccountRequirements } from "../types";
import { FormValues } from "./types";
import RequirementField from "./RequirementField";
import useRecipientForm from "./useRecipientForm";

type Props = {
  accountRequirements: AccountRequirements;
  defaultValues: FormValues;
  onCleanup: (formValues: FormValues) => void;
  targetCurrency: string;
};

export default function Form(props: Props) {
  const methods = useRecipientForm(
    props.accountRequirements,
    props.targetCurrency,
    props.defaultValues
  );

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (formValues) => {
    console.log("formValues");
    console.log(formValues);
  });

  const { onCleanup } = props;

  useEffect(
    () => () => {
      onCleanup(methods.getValues());
    },
    [methods, onCleanup]
  );

  return (
    <FormProvider {...methods}>
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
          Save
        </button>
      </form>
    </FormProvider>
  );
}
