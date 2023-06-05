import { useFormContext } from "react-hook-form";
import { FormValues, UpdateableFormValues } from "./schema";

export default function useTableData() {
  const {
    formState: { isSubmitting },
    getValues,
    watch,
  } = useFormContext<FormValues>();

  function getData(fieldName: keyof UpdateableFormValues) {
    const name = watch(`${fieldName}.name`);
    const modifiable = getValues(`${fieldName}.modifiable`);
    const delegated = watch(`${fieldName}.isActive`);

    const formDisabled = isSubmitting || !modifiable;

    return {
      delegated,
      formDisabled,
      name,
    };
  }

  return getData;
}
