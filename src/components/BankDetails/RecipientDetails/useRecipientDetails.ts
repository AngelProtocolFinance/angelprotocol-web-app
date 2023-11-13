import { useCallback, useEffect, useState } from "react";
import { FormValues } from "./types";
import { AccountRequirements, CreateRecipientRequest, Quote } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import {
  useGetAccountRequirementsForRouteMutation,
  usePostAccountRequirementsMutation,
} from "services/aws/bankDetails";
import { useErrorContext } from "contexts/ErrorContext";
import { isEmpty } from "helpers";
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
  expectedMontlyDonations: number,
  onSubmit: (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset
  ) => Promise<any>
) {
  const [requirementsDataArray, setRequirementsDataArray] = useState<
    RequirementsData[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [
    quote,
    // setQuote
  ] = useState<Quote>();
  const [isLoading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isError, setError] = useState(false);

  const { handleError } = useErrorContext();

  // const [createQuote] = useCreateQuoteMutation();
  // const [getAccountRequirements] = useGetAccountRequirementsMutation();
  const [getAccountRequirementsForRoute] =
    useGetAccountRequirementsForRouteMutation();
  const [postAccountRequirements] = usePostAccountRequirementsMutation();

  useEffect(() => {
    (async () => {
      try {
        // const newQuote = await createQuote(targetCurrency, expectedFunds).unwrap();
        // const newRequirements = await getAccountRequirements(newQuote.id).unwrap();
        const newRequirements = await getAccountRequirementsForRoute({
          targetCurrency,
          sourceAmount: expectedMontlyDonations,
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
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [
    targetCurrency,
    expectedMontlyDonations,
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
      setError(false);
    } catch (error) {
      handleError(error, ERROR_MSG);
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset
  ) => {
    try {
      setSubmitting(true);
      await onSubmit(request, bankStatementFile);
      setError(false);
    } catch (error) {
      handleError(error, ERROR_MSG);
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isError,
    isLoading,
    isSubmitting,
    refreshRequirements,
    requirementsDataArray,
    selectedIndex,
    setSelectedIndex,
    updateDefaultValues,
  };
}
