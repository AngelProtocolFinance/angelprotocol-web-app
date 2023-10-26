import { useCallback, useEffect, useState } from "react";
import { FormValues } from "./types";
import { AccountRequirements, CreateRecipientRequest, Quote } from "types/aws";
import { useAdminContext } from "pages/Admin/Context";
import { useTypedWiseMutation } from "services/aws/bankDetails";
import { useErrorContext } from "contexts/ErrorContext";
import { UnexpectedStateError } from "errors/errors";
import { EMAIL_SUPPORT } from "constants/env";
import getDefaultValues from "./getDefaultValues";

const ERROR_MSG = `An error occured. Please try again later. If the error persists, please contact ${EMAIL_SUPPORT}`;

type RequirementsData = {
  accountRequirements: AccountRequirements;
  currentFormValues: FormValues;
  refreshed: boolean;
  refreshOnSubmit: boolean; // See https://docs.wise.com/api-docs/api-reference/recipient#account-requirements
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
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const { handleError } = useErrorContext();

  const {
    // createQuote,
    // getAccountRequirements,
    getAccountRequirementsForRoute,
    postAccountRequirements,
    createRecipientAccount,
    state: { isError },
  } = useTypedWiseMutation();

  useEffect(() => {
    (async () => {
      try {
        const withdrawAmount = calculateExpectedWithdrawAmount(expectedFunds);
        // const quote = await createQuote(targetCurrency, withdrawAmount);
        // const newRequirements = await getAccountRequirements(quote.id);
        const newRequirements = await getAccountRequirementsForRoute(
          targetCurrency,
          withdrawAmount
        );

        setRequirementsDataArray(
          newRequirements.map((item) => {
            const data: RequirementsData = {
              accountRequirements: item,
              currentFormValues: getDefaultValues(item, targetCurrency),
              refreshed: false,
              refreshOnSubmit: item.fields.some((field) =>
                field.group.some((group) => group.refreshRequirementsOnChange)
              ),
            };
            return data;
          })
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

  const updateDefaultValues = useCallback(
    (formValues: FormValues) => {
      setRequirementsDataArray((prev) => {
        const updated = [...prev];
        updated[selectedIndex].currentFormValues = formValues;
        return updated;
      });
    },
    [selectedIndex]
  );

  const handleSubmit = async (request: CreateRecipientRequest) => {
    try {
      if (!quote) {
        throw new UnexpectedStateError("No 'quote' present.");
      }

      const requirements = requirementsDataArray.at(selectedIndex);
      if (!requirements) {
        throw new UnexpectedStateError("Requirements not loaded.");
      }

      setSubmitting(true);
      // refresh requirements if necessary, see https://docs.wise.com/api-docs/api-reference/recipient#account-requirements
      if (requirements.refreshOnSubmit && !requirements.refreshed) {
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
    } finally {
      setSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isError,
    isLoading,
    isSubmitting,
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
