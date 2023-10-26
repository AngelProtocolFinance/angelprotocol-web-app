import LoaderRing from "components/LoaderRing";
import { isEmpty } from "helpers";
import { EMAIL_SUPPORT } from "constants/env";
import AccountRequirementsSelector from "./AccountRequirementsSelector";
import RecipientDetailsForm from "./RecipientDetailsForm";
import useRecipientDetails from "./useRecipientDetails";

type Props = {
  targetCurrency: string;
  expectedFunds: number;
};

export default function RecipientDetails({
  targetCurrency,
  expectedFunds,
}: Props) {
  const {
    handleSubmit,
    isError,
    isLoading,
    isSubmitting, // should disable the UI when true
    requirementsDataArray,
    selectedIndex,
    setSelectedIndex,
    updateDefaultValues,
  } = useRecipientDetails(targetCurrency, expectedFunds);

  if (isLoading) {
    return (
      <div className="flex gap-2">
        <LoaderRing thickness={10} classes="w-6" /> Loading...
      </div>
    );
  }

  if (isError || isEmpty(requirementsDataArray)) {
    return (
      <span>
        An error occurred. Please try again later. If the error persists, please
        contact {EMAIL_SUPPORT}.
      </span>
    );
  }

  const requirements = requirementsDataArray[selectedIndex];

  return (
    <>
      <AccountRequirementsSelector
        accountRequirements={requirementsDataArray.map(
          (x) => x.accountRequirements
        )}
        currentIndex={selectedIndex}
        onChange={setSelectedIndex}
      />
      <RecipientDetailsForm
        // we need this key to tell React that when any of the fields passed to this component changes,
        // it needs to recreate the form state by rerendering the whole component
        key={`form-${requirements.accountRequirements.type}`}
        accountRequirements={requirements.accountRequirements}
        targetCurrency={targetCurrency}
        defaultValues={requirements.currentFormValues}
        onCleanup={updateDefaultValues}
        onSubmit={handleSubmit}
      />
    </>
  );
}
