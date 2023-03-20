import { useFormContext } from "react-hook-form";
import { FormValues, UpdateableFormValues } from "./schema";
import useUserAuthorization from "./useUserAuthorization";

export default function useTableData() {
  const { userDelegated, isUserOwner } = useUserAuthorization();
  const {
    formState: { isSubmitting },
    watch,
  } = useFormContext<FormValues>();

  function getData(fieldName: keyof UpdateableFormValues) {
    const name = watch(`${fieldName}.name`);
    const delegated = watch(`${fieldName}.delegated`);
    const modifiable = watch(`${fieldName}.modifiable`);

    const formDisabled = isSubmitting || !(userDelegated || isUserOwner);

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
