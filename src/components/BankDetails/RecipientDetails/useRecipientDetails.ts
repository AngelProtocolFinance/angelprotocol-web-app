import { useCallback, useEffect, useState } from "react";
import { FormValues, RequirementsData } from "./types";
import { CreateRecipientRequest, Quote } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import {
  useCreateQuoteMutation,
  useGetAccountRequirementsMutation,
  usePostAccountRequirementsMutation,
} from "services/aws/bankDetails";
import { useErrorContext } from "contexts/ErrorContext";
import { isEmpty } from "helpers";
import { UnexpectedStateError } from "errors/errors";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { mergeRequirements } from "./helpers";

export default function useRecipientDetails(
  isParentLoading: boolean,
  targetCurrency: string,
  expectedMontlyDonations: number,
  onSubmit: (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset,
    isDirty: boolean
  ) => Promise<any>
) {
  const [requirementsDataArray, setRequirementsDataArray] = useState<
    RequirementsData[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quote, setQuote] = useState<Quote>(); // store quote to use to refresh requirements
  const [isLoading, setLoading] = useState(true); // starts in loading state, loads only once
  const [isError, setError] = useState(false);

  const { handleError } = useErrorContext();

  const [createQuote] = useCreateQuoteMutation();
  const [getAccountRequirements] = useGetAccountRequirementsMutation();
  const [postAccountRequirements] = usePostAccountRequirementsMutation();

  useEffect(() => {
    if (isParentLoading && !isLoading) {
      setLoading(true);
    }
  }, [isParentLoading, isLoading]);

  useEffect(() => {
    (async () => {
      try {
        setError(false);
        setLoading(true);

        const newQuote = await createQuote({
          sourceAmount: expectedMontlyDonations,
          targetCurrency: targetCurrency,
        }).unwrap();

        const updatedRequirements = await getAccountRequirements(
          newQuote.id
        ).unwrap();

        if (isEmpty(updatedRequirements)) {
          setError(true);
          return handleError(
            "Target currency not supported. Please use a bank account with a different currency."
          );
        }

        setRequirementsDataArray((prevDataArray) =>
          mergeRequirements(prevDataArray, updatedRequirements, targetCurrency)
        );
        setQuote(newQuote);
      } catch (error) {
        handleError(error, GENERIC_ERROR_MESSAGE);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [
    // despite these parameters being included in the dep. array,
    // this effect will only ever be run once (see ../BankDetails.tsx)
    targetCurrency,
    expectedMontlyDonations,
    createQuote,
    getAccountRequirements,
    handleError,
  ]);

  const updateDefaultValues = useCallback(
    (formValues: FormValues) => {
      setRequirementsDataArray((prev) => {
        try {
          const updated = [...prev];
          const toUpdate = updated.find(
            (x) => x.accountRequirements.type === formValues.type
          );

          if (!!toUpdate) {
            toUpdate.currentFormValues = formValues;
            return updated;
          }

          throw new UnexpectedStateError(
            `Trying to update a non existent requirements type: ${formValues.type}`
          );
        } catch (error) {
          handleError(error, GENERIC_ERROR_MESSAGE);
          setError(true);
          return prev;
        }
      });
    },
    [handleError]
  );

  // no need to have an `isRefreshing` state, as this is handled by `react-hook-form`
  // in ./RecipientDetailsForm/Form.tsx
  const refreshRequirements = async (request: CreateRecipientRequest) => {
    try {
      if (!quote) {
        throw new UnexpectedStateError("No 'quote' present.");
      }

      setError(false);

      const newRequirements = await postAccountRequirements({
        quoteId: quote.id,
        request,
      }).unwrap();

      setRequirementsDataArray((prevDataArray) =>
        mergeRequirements(prevDataArray, newRequirements, targetCurrency)
      );
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
      setError(true);
    }
  };

  const handleSubmit = async (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset,
    isDirty: boolean
  ) => {
    try {
      setError(false);
      await onSubmit(request, bankStatementFile, isDirty);
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
      setError(true);
    }
  };

  return {
    handleSubmit,
    isError,
    /**
     * Flag indicating whether currencies are loading
     */
    isLoading,
    refreshRequirements,
    activeRequirements: requirementsDataArray.filter((x) => x.active),
    selectedIndex,
    setSelectedIndex,
    updateDefaultValues,
  };
}
