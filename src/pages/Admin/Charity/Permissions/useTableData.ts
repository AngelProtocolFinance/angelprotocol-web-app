import { useFormContext } from "react-hook-form";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext";
import { FormValues, UpdateableFormValues } from "./schema";

export default function useTableData() {
  const { wallet } = useGetWallet();
  const { propMeta } = useAdminResources();
  const {
    formState: { isSubmitting },
    watch,
  } = useFormContext<FormValues>();

  function getData(fieldName: keyof UpdateableFormValues) {
    const delegate = watch(`${fieldName}.delegate`);
    const name = watch(`${fieldName}.name`);
    const initDelegate = watch(`initialValues.${fieldName}.delegate`);
    const initDelegateAddress = watch(
      `initialValues.${fieldName}.delegate_address`
    );
    const initModifiable = watch(`initialValues.${fieldName}.modifiable`);
    const modifiable = watch(`${fieldName}.modifiable`);
    const initOwnerControlled = watch(
      `initialValues.${fieldName}.owner_controlled`
    );
    const userAuthorized: boolean =
      (initDelegate &&
        !!initDelegateAddress &&
        initDelegateAddress !== wallet?.address) ||
      (initOwnerControlled && propMeta.isAuthorized);

    const isDisabled = isSubmitting || !initModifiable || !userAuthorized;

    const inputDisabled = isDisabled || !modifiable;

    return {
      delegateAddressDisabled: !delegate || inputDisabled,
      checkboxDisabled: inputDisabled,
      lockBtnDisabled: isDisabled,
      name,
    };
  }

  return getData;
}
