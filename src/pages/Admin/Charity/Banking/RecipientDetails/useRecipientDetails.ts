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
import { Asset } from "components/FileDropzone";
import { getFilePreviews, isEmpty } from "helpers";
import { UnexpectedStateError } from "errors/errors";
import { EMAIL_SUPPORT } from "constants/env";
import getDefaultValues from "./getDefaultValues";

const ERROR_MSG = `An error occured. Please try again later. If the error persists, please contact ${EMAIL_SUPPORT}`;

type RequirementsData = {
  accountRequirements: AccountRequirements;
  currentFormValues: FormValues;
  /**
   * Indicates whether requirements refresh is necessary.
   *
   * See https://docs.wise.com/api-docs/api-reference/recipient#account-requirements
   */
  refreshRequired: boolean;
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
  const [
    quote,
    // setQuote
  ] = useState<Quote>();
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
        // const newQuote = await createQuote(targetCurrency, sourceAmount).unwrap();
        // const newRequirements = await getAccountRequirements(newQuote.id).unwrap();
        const newRequirements = await getAccountRequirementsForRoute({
          targetCurrency,
          sourceAmount,
        }).unwrap();

        if (isEmpty(newRequirements)) {
          return handleError(
            "Target currency not supported. Please use a bank account with a different currency."
          );
        }

        setRequirementsDataArray(
          newRequirements.map((item) => {
            const data: RequirementsData = {
              accountRequirements: item,
              currentFormValues: getDefaultValues(item, targetCurrency),
              refreshRequired: item.fields.some((field) =>
                field.group.some((group) => group.refreshRequirementsOnChange)
              ),
            };
            return data;
          })
        );
        // setQuote(newQuote);
      } catch (error) {
        handleError(error, ERROR_MSG);
      } finally {
        setLoading(false);
      }
    })();
  }, [
    targetCurrency,
    expectedFunds,
    // createQuote,
    // getAccountRequirements,
    getAccountRequirementsForRoute,
    handleError,
  ]);

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

  const refreshRequirements = async (request: CreateRecipientRequest) => {
    try {
      if (!quote) {
        throw new UnexpectedStateError("No 'quote' present.");
      }

      const requirements = requirementsDataArray.at(selectedIndex);
      if (!requirements) {
        throw new UnexpectedStateError("Requirements not loaded.");
      }
      if (!requirements.refreshRequired) {
        throw new UnexpectedStateError(
          "Requirements don't need to be refreshed."
        );
      }

      setSubmitting(true);

      const newRequirements = await postAccountRequirements({
        quoteId: quote.id,
        request,
      }).unwrap();
      setRequirementsDataArray((prev) => {
        const updated = [...prev];
        updated[selectedIndex].accountRequirements = newRequirements;
        updated[selectedIndex].refreshRequired = false;
        // TODO: use the below logic once Wise API token start working
        // updated[selectedIndex].refreshRequired = newRequirements.fields.some(
        //   (field) =>
        //     field.group.some((group) => group.refreshRequirementsOnChange)
        // );
        return updated;
      });
    } catch (error) {
      handleError(error, ERROR_MSG);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (
    request: CreateRecipientRequest,
    bankStatementPDF: Asset
  ) => {
    try {
      setSubmitting(true);
      const bankStatementPreview = await getFilePreviews({ bankStatementPDF });
      // TODO: logging just to avoid compiler warnings about unused variable,
      // will be updated to real logic once possible
      console.log(bankStatementPreview.bankStatementPDF);
      await createRecipientAccount({ PK: endowment_id, request }).unwrap();
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
    refreshRequirements,
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
