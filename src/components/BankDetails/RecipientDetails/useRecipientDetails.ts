import { useCallback, useEffect, useState } from "react";
import { FormValues } from "./types";
import { AccountRequirements, CreateRecipientRequest, Quote } from "types/aws";
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
import { getDefaultValues, updateReqField } from "./helpers";

type RequirementsData = {
  accountRequirements: AccountRequirements;
  currentFormValues: FormValues;
  /**
   * Indicates whether requirements refresh is necessary.
   * See https://docs.wise.com/api-docs/api-reference/recipient#account-requirements
   */
  refreshRequired: boolean;
};

export default function useRecipientDetails(
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
  const [isSubmitting, setSubmitting] = useState(false);
  const [isError, setError] = useState(false);

  const { handleError } = useErrorContext();

  const [createQuote] = useCreateQuoteMutation();
  const [getAccountRequirements] = useGetAccountRequirementsMutation();
  const [postAccountRequirements] = usePostAccountRequirementsMutation();

  useEffect(() => {
    (async () => {
      try {
        const newQuote = await createQuote({
          sourceAmount: expectedMontlyDonations,
          targetCurrency: targetCurrency,
        }).unwrap();

        const newRequirements = await getAccountRequirements(
          newQuote.id
        ).unwrap();

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

      // should never happen, but throw immediately if it does
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
        const updated: RequirementsData[] = newRequirements.map((newReq) => ({
          accountRequirements: newReq,
          currentFormValues: refreshFormValues(prev, newReq, targetCurrency),
          refreshRequired:
            prev[selectedIndex].accountRequirements.type === newReq.type
              ? false // just finished checking requirements for selected type, so no need to do it again
              : prev[selectedIndex].refreshRequired, // just copy/paste for other types
        }));
        return updated;
      });
      setError(false);
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset,
    isDirty: boolean
  ) => {
    try {
      setSubmitting(true);
      await onSubmit(request, bankStatementFile, isDirty);
      setError(false);
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
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

function refreshFormValues(
  prevReqDataArr: RequirementsData[],
  newReq: AccountRequirements,
  targetCurrency: string
): FormValues {
  const prevReqData = prevReqDataArr.find(
    (prevReq) => prevReq.accountRequirements.type === newReq.type
  );

  if (!prevReqData) {
    return getDefaultValues(newReq, targetCurrency);
  }

  const currentRequirementGroups =
    prevReqData.accountRequirements.fields.flatMap((field) => field.group);

  const newRequirementGroups = newReq.fields
    .flatMap((field) => field.group)
    .filter(
      (group) =>
        !currentRequirementGroups.find((curGroup) => curGroup.key === group.key)
    );

  const newRequirements: FormValues["requirements"] =
    newRequirementGroups.reduce((curr, group) => updateReqField(curr, group), {
      ...prevReqData.currentFormValues.requirements,
    });

  console.log("--------------------");
  console.log(`prev reqs`);
  console.log(prevReqData.currentFormValues);
  console.log(`new reqs`);
  console.log(newRequirements);
  console.log("--------------------");

  const newFormValues: FormValues = {
    ...prevReqData.currentFormValues,
    requirements: newRequirements,
  };

  return newFormValues;
}
