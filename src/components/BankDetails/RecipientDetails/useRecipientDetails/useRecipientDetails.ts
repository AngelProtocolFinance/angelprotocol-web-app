import { useCallback, useEffect, useState } from "react";
import { FormValues, RequirementsData } from "../types";
import { CreateRecipientRequest } from "types/aws";
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
import useStateReducer from "./useStateReducer";

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
  const [state, dispatch] = useStateReducer();

  const [isLoading, setLoading] = useState(true); // starts in loading state, loads only once
  const [isError, setError] = useState(false);

  const { handleError } = useErrorContext();

  const [createQuote] = useCreateQuoteMutation();
  const [getAccountRequirements] = useGetAccountRequirementsMutation();
  const [postAccountRequirements] = usePostAccountRequirementsMutation();

  useEffect(() => {
    (async () => {
      // Need to set this to `true` prior to checking `isParentLoading` to avoid a UI blink:
      // How the "blink" would happen otherwise would be like:
      // 1. isLoading = false, isParentLoading = true
      //    << UI is loading >>
      // 2. isLoading = false, isParentLoading = false
      //    << UI is displayed --> BLINK >>
      // 3. isLoading = true, isParentLoading = false
      //    << UI is loading >>
      setLoading(true);

      if (isParentLoading) {
        return;
      }

      try {
        setError(false);

        const quote = await createQuote({
          sourceAmount: expectedMontlyDonations,
          targetCurrency: targetCurrency,
        }).unwrap();

        const requirements = await getAccountRequirements(quote.id).unwrap();

        // There are some currencies that Wise does not allow to be used (why they allow selecting those currencies is unclear).
        // For these currencies, Wise returns no requirement data
        if (isEmpty(requirements)) {
          throw new Error(
            "Target currency not supported. Please use a bank account with a different currency."
          );
        }

        dispatch({
          type: "UPDATE_REQUIREMENTS",
          payload: { quote, requirements, targetCurrency },
        });
      } catch (error) {
        handleError(error, GENERIC_ERROR_MESSAGE);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [
    isParentLoading,
    expectedMontlyDonations,
    targetCurrency,
    createQuote,
    getAccountRequirements,
    handleError,
  ]);

  const updateDefaultValues = useCallback(
    (formValues: FormValues) => {
      try {
        dispatch({ type: "UPDATE_FORM_VALUES", payload: formValues });
      } catch (error) {
        handleError(error, GENERIC_ERROR_MESSAGE);
        setError(true);
      }
    },
    [handleError]
  );

  // no need to have an `isRefreshing` state, as this is handled by `react-hook-form`
  // in ./RecipientDetailsForm/Form.tsx
  const refreshRequirements = async (request: CreateRecipientRequest) => {
    try {
      if (!state.quote) {
        throw new UnexpectedStateError("No 'quote' present.");
      }

      setError(false);

      const requirements = await postAccountRequirements({
        quoteId: state.quote.id,
        request,
      }).unwrap();

      dispatch({
        type: "UPDATE_REQUIREMENTS",
        payload: { targetCurrency, requirements, isRefreshing: true },
      });
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

  const changeSelectedType = (data: RequirementsData) => {
    dispatch({ type: "CHANGE_SELECTED_REQUIREMENTS_DATA", payload: data });
  };

  return {
    handleSubmit,
    isError,
    /**
     * Flag indicating whether currencies are loading
     */
    isLoading: isLoading || isParentLoading,
    refreshRequirements,
    requirementsDataArray: state.requirementsDataArray.filter((x) => x.active),
    selectedRequirementsData: state.selectedRequirementsData,
    changeSelectedType,
    updateDefaultValues,
  };
}
