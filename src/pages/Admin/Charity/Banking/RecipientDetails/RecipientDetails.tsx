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
    quote,
    requirementsDataArray,
    selectedIndex,
    updateDefaultValues,
  } = useRecipientDetails(targetCurrency, sourceAmount);

  if (!quote || isEmpty(requirementsDataArray)) {
    return (
      <div className="flex gap-2">
        <LoaderRing thickness={10} classes="w-6" /> Loading...
      </div>
    );
  }

  if (isError) {
    return null;
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
