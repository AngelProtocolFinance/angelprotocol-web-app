import { ComponentType } from "react";
import { FormButtonsProps } from "../types";
import { CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import LoaderRing from "components/LoaderRing";
import { isEmpty } from "helpers";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { EMAIL_SUPPORT } from "constants/env";
import AccountRequirementsSelector from "./AccountRequirementsSelector";
import RecipientDetailsForm from "./RecipientDetailsForm";
import useRecipientDetails from "./useRecipientDetails";

type Props = {
  /**
   * The flag is used to display a loading indicator (e.g. when debouncing `expectedMontlyDonations`) without
   * having to unmount the component itself - this way the current form state gets stored between form loads
   * and we are able to prefill the form fields
   */
  isLoading: boolean;
  isSubmitting: boolean;
  targetCurrency: string;
  expectedMontlyDonations: number;
  FormButtons: ComponentType<FormButtonsProps>;
  onSubmit: (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset,
    isDirty: boolean
  ) => Promise<void>;
};

export default function RecipientDetails({
  isLoading,
  isSubmitting,
  targetCurrency,
  expectedMontlyDonations,
  FormButtons,
  onSubmit,
}: Props) {
  const {
    activeRequirements,
    handleSubmit,
    isError,
    isLoading: isLoadingRequirements,
    refreshRequirements,
    selectedIndex,
    setSelectedIndex,
    updateDefaultValues,
  } = useRecipientDetails(
    isLoading,
    targetCurrency,
    expectedMontlyDonations,
    onSubmit
  );

  // no need to check `isLoading` too, as it already affects the value of `isLoadingRequirements`
  if (isLoadingRequirements) {
    return (
      <div className="flex items-center gap-2">
        <LoaderRing thickness={10} classes="w-6" /> Loading...
      </div>
    );
  }

  if (isError) {
    return <span>{GENERIC_ERROR_MESSAGE}</span>;
  }

  // requirements *can* be empty, check the following example when source currency is USD and target is ALL (Albanian lek):
  // https://api.sandbox.transferwise.tech/v1/account-requirements?source=USD&target=ALL&sourceAmount=1000
  if (isEmpty(activeRequirements)) {
    return (
      <span>
        Target currency not supported. Please use a bank account with a
        different currency.
      </span>
    );
  }

  const requirements = activeRequirements.at(selectedIndex);

  // should never happen as `selectedIndex === 0` by default and can only be set to value smaller than `activeRequirements.length`
  if (!requirements) {
    return (
      <span>
        Non-existent requirements type selected. Please reload the page and try
        again. If the error persists, please contact {EMAIL_SUPPORT}.
      </span>
    );
  }

  return (
    <>
      <AccountRequirementsSelector
        accountRequirements={activeRequirements.map(
          (x) => x.accountRequirements
        )}
        currentIndex={selectedIndex}
        disabled={isSubmitting}
        onChange={setSelectedIndex}
        className="mb-6"
      />
      <RecipientDetailsForm
        // since all fields need to be rerendered when new requirements type is chosen,
        // we can set this key to tell React that when any of the fields passed to this component changes,
        // it needs to recreate the form state by rerendering the whole component
        //
        // Reason for using `requirements.accountRequirements.fields.length` to set the component key is that upo
        // refreshing the requirements, the number of fields will change, thus causing the whole form to be recreated
        key={`form-${requirements.accountRequirements.type}-${requirements.accountRequirements.fields.length}`}
        accountRequirements={requirements.accountRequirements}
        defaultValues={requirements.currentFormValues}
        disabled={isSubmitting}
        refreshRequired={requirements.refreshRequired}
        newRequirementsAdded={requirements.refreshedRequirementsAdded}
        onUpdateValues={updateDefaultValues}
        onSubmit={handleSubmit}
        onRefresh={refreshRequirements}
        FormButtons={FormButtons}
      />
    </>
  );
}
