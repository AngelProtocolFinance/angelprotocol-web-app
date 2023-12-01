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
import { addRequirementGroup, getDefaultValues } from "./helpers";

type RequirementsData = {
  accountRequirements: AccountRequirements;
  currentFormValues: FormValues;
  newRequirementsAdded: boolean;
  /**
   * Indicates whether requirements refresh is necessary.
   * See https://docs.wise.com/api-docs/api-reference/recipient#account-requirements
   */
  refreshRequired: boolean;
};

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
      setError(false);
      setLoading(true);

      try {
        const newQuote = await createQuote({
          sourceAmount: expectedMontlyDonations,
          targetCurrency: targetCurrency,
        }).unwrap();

        const newRequirements = await getAccountRequirements(
          newQuote.id
        ).unwrap();

        if (isEmpty(newRequirements)) {
          setError(true);
          return handleError(
            "Target currency not supported. Please use a bank account with a different currency."
          );
        }

        setRequirementsDataArray((prev) =>
          newRequirements.map((item) => {
            const { formValues, newRequirementsAdded } = getRefreshedFormValues(
              prev,
              item,
              targetCurrency
            );

            const data: RequirementsData = {
              accountRequirements: item,
              currentFormValues: formValues,
              newRequirementsAdded: newRequirementsAdded,
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

  // no need to have an `isRefreshing` state, as this is handled by `react-hook-form`
  // in ./RecipientDetailsForm/Form.tsx
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

      const newRequirements = await postAccountRequirements({
        quoteId: quote.id,
        request,
      }).unwrap();

      setRequirementsDataArray((prev) => {
        const updated: RequirementsData[] = newRequirements.map((newReq) => {
          const { formValues, newRequirementsAdded } = getRefreshedFormValues(
            prev,
            newReq,
            targetCurrency
          );

          return {
            accountRequirements: newReq,
            currentFormValues: formValues,
            newRequirementsAdded,
            refreshRequired:
              prev[selectedIndex].accountRequirements.type === newReq.type
                ? false // just finished checking requirements for selected type, so no need to do it again
                : prev[selectedIndex].refreshRequired, // just copy/paste for other types
          };
        });
        return updated;
      });
      setError(false);
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
      await onSubmit(request, bankStatementFile, isDirty);
      setError(false);
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
    requirementsDataArray,
    selectedIndex,
    setSelectedIndex,
    updateDefaultValues,
  };
}

/**
 * Checks whether there are any new requirements to add to the form and if so, adds them and sets them
 * to the appropriate default value.
 *
 * @param currReqData current requirements data
 * @param newReq new requirements that might include new requirement groups
 * @param targetCurrency target currency
 * @returns object containing previous form values with the new requirements included and set to appropriate default values AND
 * a flag indicating whether any new requirements were added to the form
 */
function getRefreshedFormValues(
  currReqDataArray: RequirementsData[],
  newReq: AccountRequirements,
  targetCurrency: string
): {
  newRequirementsAdded: boolean;
  formValues: FormValues;
} {
  // should be undefined when loading for the first time or changing target currency/expected monthly donations
  // should always be found when refreshing but not 100% sure how Wise behaves in all cases
  const currReqData = currReqDataArray.find(
    (x) => x.accountRequirements.type === newReq.type
  );

  if (!currReqData) {
    return {
      formValues: getDefaultValues(newReq, targetCurrency),
      newRequirementsAdded: false, // these are technically new requirements
    };
  }

  // get current requirement groups
  const currGroups = currReqData.accountRequirements.fields.flatMap(
    (field) => field.group
  );

  // get only new requirement groups
  const newGroups = newReq.fields
    .flatMap((field) => field.group)
    .filter((ng) => !currGroups.find((cg) => cg.key === ng.key));

  // add new requirement groups (if any) to the current requirements
  const newRequirements: FormValues["requirements"] = newGroups.reduce(
    (curr, group) => addRequirementGroup(curr, group),
    { ...currReqData.currentFormValues.requirements }
  );

  // update default form values
  const newFormValues: FormValues = {
    ...currReqData.currentFormValues,
    requirements: newRequirements,
  };

  return {
    formValues: newFormValues,
    newRequirementsAdded: !isEmpty(newGroups),
  };
}
