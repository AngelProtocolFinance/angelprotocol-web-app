import { ComponentType } from "react";
import { FormButtonsProps } from "../types";
import { CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import LoaderRing from "components/LoaderRing";
import { isEmpty } from "helpers";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { EMAIL_SUPPORT } from "constants/env";
import { Currency } from "../../CurrencySelector";
import AccountRequirementsSelector from "./AccountRequirementsSelector";
import RecipientDetailsForm from "./RecipientDetailsForm";
import useRecipientDetails from "./useRecipientDetails";

type Props = {
  /**
   * The flag is used to display a loading indicator (e.g. when debouncing `expectedMontlyDonations`) without
   * having to unmount the component itself - this way the current form state gets stored between form loads
   * even when new form requirements are being loaded (when "expectedMontlyDonations" value changes)
   */
  isLoading: boolean;
  isSubmitting: boolean;
  currency: Currency;
  expectedMontlyDonations: number;
  FormButtons: ComponentType<FormButtonsProps>;
  onSubmit: (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset,
    isDirty: boolean
  ) => Promise<void>;
};

const MIN_HEIGHT = "min-h-[20rem]";

export default function RecipientDetails({
  isLoading,
  isSubmitting,
  currency,
  expectedMontlyDonations,
  FormButtons,
  onSubmit,
}: Props) {
  const {
    focusNewRequirements,
    isError,
    isLoading: isLoadingRequirements,
    requirementsDataArray,
    selectedRequirementsData,
    changeSelectedType,
    handleSubmit,
    refreshRequirements,
    updateDefaultValues,
  } = useRecipientDetails(
    isLoading,
    currency,
    expectedMontlyDonations,
    onSubmit
  );

  // no need to check `isLoading` from the parent, as it already affects the value of `isLoadingRequirements`
  if (isLoadingRequirements) {
    return (
      <div className={MIN_HEIGHT}>
        <div className="flex items-center gap-2">
          <LoaderRing thickness={10} classes="w-6" /> Loading...
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className={MIN_HEIGHT}>{GENERIC_ERROR_MESSAGE}</div>;
  }

  // requirements *can* be empty, check the following example when source currency is USD and target is ALL (Albanian lek):
  // https://api.sandbox.transferwise.tech/v1/account-requirements?source=USD&target=ALL&sourceAmount=1000
  if (isEmpty(requirementsDataArray)) {
    return (
      <div className={MIN_HEIGHT}>
        Target currency not supported. Please use a bank account with a
        different currency.
      </div>
    );
  }

  // should never happen when `requirementsDataArray.length > 0`
  if (!selectedRequirementsData) {
    return (
      <div className={MIN_HEIGHT}>
        There was an error selecting the requirements data. Please reload the
        page and try again. If the error persists, please contact{" "}
        {EMAIL_SUPPORT}.
      </div>
    );
  }

  return (
    <div className={MIN_HEIGHT}>
      <AccountRequirementsSelector
        className="mb-6"
        disabled={isSubmitting}
        onChange={changeSelectedType}
        requirementsDataArray={requirementsDataArray}
        selectedType={selectedRequirementsData.accountRequirements.type}
      />
      <RecipientDetailsForm
        // since all fields need to be rerendered when new requirements type is chosen, we can set
        // this key to tell React that when any of the fields passed to this component changes, it
        // needs to recreate the form state by rerendering the whole component.
        // The reason for using `requirements.accountRequirements.fields.length` as part of the
        // component key is that upon refreshing the requirements, the number of fields will change,
        // thus causing the whole form to be recreated (reinitiating the whole form with `react-hook-form > useForm`)
        key={`form-${selectedRequirementsData.accountRequirements.type}-${selectedRequirementsData.accountRequirements.fields.length}`}
        currency={currency}
        disabled={isSubmitting}
        focusNewRequirements={focusNewRequirements}
        FormButtons={FormButtons}
        requirementsData={selectedRequirementsData}
        onRefresh={refreshRequirements}
        onSubmit={handleSubmit}
        onUpdateValues={updateDefaultValues}
      />
    </div>
  );
}
