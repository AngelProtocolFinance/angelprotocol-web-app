import LoaderRing from "components/LoaderRing";
import { isEmpty } from "helpers";
import { EMAIL_SUPPORT } from "constants/env";
import AccountRequirementsSelector from "./AccountRequirementsSelector";
import RecipientDetailsForm from "./RecipientDetailsForm";
import useRecipientDetails from "./useRecipientDetails";

type Props = {
  disabled: boolean;
  targetCurrency: string;
  expectedMontlyDonations: number;
};

export default function RecipientDetails({
  disabled,
  targetCurrency,
  expectedMontlyDonations,
}: Props) {
  const {
    handleSubmit,
    isError,
    isLoading,
    // isSubmitting, // should disable the UI when true
    refreshRequirements,
    requirementsDataArray,
    selectedIndex,
    setSelectedIndex,
    updateDefaultValues,
  } = useRecipientDetails(targetCurrency, expectedMontlyDonations);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <LoaderRing thickness={10} classes="w-6" /> Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <span>
        An error occurred. Please try again later. If the error persists, please
        contact {EMAIL_SUPPORT}.
      </span>
    );
  }

  // requirements *can* be empty, check the following example when source currency is USD and target is ALL (Albanian lek):
  // https://api.sandbox.transferwise.tech/v1/account-requirements?source=USD&target=ALL&sourceAmount=1000
  if (isEmpty(requirementsDataArray)) {
    return (
      <span>
        Target currency not supported. Please use a bank account with a
        different currency.
      </span>
    );
  }

  const requirements = requirementsDataArray.at(selectedIndex);

  // should never happen as `selectedIndex === 0` by default and can only be set to value smaller than `requirementsDataArray.length`
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
        accountRequirements={requirementsDataArray.map(
          (x) => x.accountRequirements
        )}
        currentIndex={selectedIndex}
        disabled={disabled}
        onChange={setSelectedIndex}
        className="mb-6"
      />
      <RecipientDetailsForm
        // since all fields need to be rerendered when new requirements type is chosen,
        // we can set this key to tell React that when any of the fields passed to this component changes,
        // it needs to recreate the form state by rerendering the whole component
        key={`form-${requirements.accountRequirements.type}`}
        accountRequirements={requirements.accountRequirements}
        defaultValues={requirements.currentFormValues}
        disabled={disabled}
        refreshRequired={requirements.refreshRequired}
        onCleanup={updateDefaultValues}
        onSubmit={handleSubmit}
        onRefresh={refreshRequirements}
      />
    </>
  );
}
