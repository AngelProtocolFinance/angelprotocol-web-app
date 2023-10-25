import LoaderRing from "components/LoaderRing";
import { isEmpty } from "helpers";
import AccountRequirementsSelector from "./AccountRequirementsSelector";
import RecipientDetailsForm from "./RecipientDetailsForm";
import useRecipientDetails from "./useRecipientDetails";

type Props = {
  targetCurrency: string;
  sourceAmount: number;
};

export default function RecipientDetails({
  targetCurrency,
  sourceAmount,
}: Props) {
  const {
    dispatch,
    handleSubmit,
    isError,
    isLoading,
    requirementsDataArray,
    selectedIndex,
    updateDefaultValues,
  } = useRecipientDetails(targetCurrency, sourceAmount);

  if (isLoading) {
    return (
      <div className="flex gap-2">
        <LoaderRing thickness={10} classes="w-6" /> Loading...
      </div>
    );
  }

  if (isError || isEmpty(requirementsDataArray)) {
    return <span>An error occurred</span>;
  }

  const requirements = requirementsDataArray[selectedIndex];

  return (
    <>
      <AccountRequirementsSelector
        accountRequirements={requirementsDataArray.map(
          (x) => x.accountRequirements
        )}
        currentIndex={selectedIndex}
        onChange={(index: number) =>
          dispatch({ type: "selectedIndex", payload: index })
        }
      />
      <RecipientDetailsForm
        // we need this key to tell React that when any of the fields passed to this component changes,
        // it needs to rerender the whole component and thus recreate the form
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
