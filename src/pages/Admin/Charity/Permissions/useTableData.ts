import { useFormContext } from "react-hook-form";
import { useAdminResources } from "pages/Admin/Guard";
import { FormValues, UpdateableFormValues } from "./schema";

export default function useTableData() {
  const {
    formState: { isSubmitting },
    watch,
  } = useFormContext<FormValues>();
  const { propMeta } = useAdminResources();

  function getData(fieldName: keyof UpdateableFormValues) {
    const name = watch(`${fieldName}.name`);
    const delegated = watch(`${fieldName}.isActive`);
    const modifiable = watch(`${fieldName}.modifiableAfterInit`);

    const formDisabled = isSubmitting || !propMeta.isAuthorized;
    const inputDisabled = formDisabled || !modifiable;

    return {
      delegateAddressDisabled: !delegated || inputDisabled,
      checkboxDisabled: inputDisabled,
      lockBtnDisabled: formDisabled,
      name,
    };
  }

  return getData;
}
