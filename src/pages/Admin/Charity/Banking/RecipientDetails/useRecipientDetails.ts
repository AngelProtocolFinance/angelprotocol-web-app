import { useEffect, useState } from "react";
import { FormValues } from "./types";
import { AccountRequirements, CreateRecipientRequest, Quote } from "types/aws";
import { useAdminContext } from "pages/Admin/Context";
import { useWiseMutationProxy } from "services/aws/bankDetails";
import { useErrorContext } from "contexts/ErrorContext";
import { isEmpty } from "helpers";
import { UnexpectedStateError } from "errors/errors";
import { EMAIL_SUPPORT } from "constants/env";

const ERROR_MSG = `An error occured. Please try again later. If the error persists, please contact ${EMAIL_SUPPORT}`;

type RequirementsData = {
  accountRequirements: AccountRequirements;
  currentFormValues?: FormValues;
  refreshed: boolean;
};

export default function useRecipientDetails(
  targetCurrency: string,
  expectedFunds: number
) {
  const { id } = useAdminContext();
  const [requirementsDataArray, setRequirementsDataArray] = useState<
    RequirementsData[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quote, setQuote] = useState<Quote>();
  const [isLoading, setLoading] = useState<boolean>(true);

  const { handleError } = useErrorContext();

  const {
    createQuote,
    getAccountRequirements,
    postAccountRequirements,
    createRecipientAccount,
    state: { isError },
  } = useWiseMutationProxy();

  const updateDefaultValues = (formValues: FormValues) => {
    setRequirementsDataArray((prev) => {
      const updated = [...prev];
      updated[selectedIndex].currentFormValues = formValues;
      return updated;
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const withdrawAmount = calculateExpectedWithdrawAmount(expectedFunds);
        const quote = await createQuote(targetCurrency, withdrawAmount);
        const newRequirements = await getAccountRequirements(quote.id);

        setRequirementsDataArray(
          newRequirements.map((item) => ({
            accountRequirements: item,
            refreshed: false,
          }))
        );
        setQuote(quote);
        setLoading(false);
      } catch (error) {
        handleError(error, ERROR_MSG);
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (
    request: CreateRecipientRequest,
    refreshRequirementsNeeded: boolean
  ) => {
    try {
      if (!quote) {
        throw new UnexpectedStateError("No 'quote' present.");
      }
      if (isEmpty(requirementsDataArray)) {
        throw new UnexpectedStateError("Requirements not loaded.");
      }
      // refresh requirements if necessary
      if (
        !requirementsDataArray[selectedIndex].refreshed &&
        refreshRequirementsNeeded
      ) {
        const newRequirements = await postAccountRequirements(
          quote.id,
          request
        );
        setRequirementsDataArray((prev) => {
          const updated = [...prev];
          updated[selectedIndex].accountRequirements = newRequirements;
          updated[selectedIndex].refreshed = true;
          return updated;
        });
      }
      // otherwise create the recipient
      else {
        await createRecipientAccount(id, request);
      }
    } catch (error) {
      handleError(error, ERROR_MSG);
    }
  };

  return {
    handleSubmit,
    isError,
    isLoading,
    requirementsDataArray,
    selectedIndex,
    setSelectedIndex,
    updateDefaultValues,
  };
}

// Random calculation, will be handled in separate issue
// See https://linear.app/angel-protocol/issue/AP-859/set-an-actual-calculation-to-get-the-estimate-withdrawal-amount-when
function calculateExpectedWithdrawAmount(sourceAmount: number): number {
  return sourceAmount / 10;
}
