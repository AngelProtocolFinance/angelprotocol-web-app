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
    const delegated = watch(`${fieldName}.delegate`);
    const modifiable = watch(`${fieldName}.modifiable`);

    const controllerModifiable = watch(`endowment_controller.modifiable`);

    const isDisabled =
      isSubmitting || !controllerModifiable || !(userDelegated || isUserOwner);

    const inputDisabled = isDisabled || !modifiable;

    return {
      delegateAddressDisabled: !delegated || inputDisabled,
      checkboxDisabled: inputDisabled,
      lockBtnDisabled: isDisabled,
      name,
    };
  }

  return getData;
}
