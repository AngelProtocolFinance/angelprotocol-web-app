import { useCallback, useEffect, useState } from "react";
import { FormValues } from "./types";
import { AccountRequirements, CreateRecipientRequest, Quote } from "types/aws";
import { useAdminContext } from "pages/Admin/Context";
import {
  // useCreateQuoteMutation,
  // useGetAccountRequirementsMutation,
  useCreateRecipientAccountMutation,
  useGetAccountRequirementsForRouteMutation,
  usePostAccountRequirementsMutation,
} from "services/aws/bankDetails";
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
  const { id: endowment_id } = useAdminContext();
  const [requirementsDataArray, setRequirementsDataArray] = useState<
    RequirementsData[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quote, setQuote] = useState<Quote>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const { handleError } = useErrorContext();

  // const [createQuote, { isError }] = useCreateQuoteMutation();
  // const [getAccountRequirements, { isError: isError1 }] =
  //   useGetAccountRequirementsMutation();
  const [getAccountRequirementsForRoute, { isError: isError1 }] =
    useGetAccountRequirementsForRouteMutation();
  const [postAccountRequirements, { isError: isError2 }] =
    usePostAccountRequirementsMutation();
  const [createRecipientAccount, { isError: isError3 }] =
    useCreateRecipientAccountMutation();

  useEffect(() => {
    (async () => {
      try {
        const sourceAmount = calculateExpectedWithdrawAmount(expectedFunds);
        // const quote = await createQuote(targetCurrency, sourceAmount).unwrap();
        // const newRequirements = await getAccountRequirements(quote.id).unwrap();
        const newRequirements = await getAccountRequirementsForRoute({
          targetCurrency,
          sourceAmount,
        }).unwrap();

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
        const newRequirements = await postAccountRequirements({
          quoteId: quote.id,
          request,
        }).unwrap();
        setRequirementsDataArray((prev) => {
          const updated = [...prev];
          updated[selectedIndex].accountRequirements = newRequirements;
          updated[selectedIndex].refreshed = true;
          return updated;
        });
      }
      // otherwise create the recipient
      else {
        await createRecipientAccount({ endowment_id, request }).unwrap();
      }
    } catch (error) {
      handleError(error, ERROR_MSG);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isError: isError1 || isError2 || isError3,
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
