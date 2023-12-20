import { FormValues, RequirementsData } from "../types";
import { AccountRequirements } from "types/aws";
import { isEmpty } from "helpers";
import { Currency } from "../../../CurrencySelector";
import { getDefaultValues, populateRequirementGroup } from "./getDefaultValues";

/**
 * Updates current array of requirements data with the updated requirements (newly loaded from Wise).
 * Includes:
 * - copying any old requirements form state
 * - adding any new requirements with their default values
 *
 * @param requirementsDataArray current array of requirements data containing all previously input form state
 * @param updatedRequirements updated requirements based on newly selected currency and expected monthly donation amount
 * @param currency target currency for which requirements were loaded
 * @param isRefreshed flag indicating whether the fields are being processed after refreshing the requirements
 * @returns updated requirements data array
 */
export default function mergeRequirements(
  requirementsDataArray: RequirementsData[],
  updatedRequirements: AccountRequirements[],
  currency: Currency,
  isRefreshed = false
): RequirementsData[] {
  // separate requirements data array into active and inactive ones based on whether
  // the account requirements within are a member of the updated requirements array
  const requirementsDataArrays = separate(
    requirementsDataArray,
    updatedRequirements
  );

  // resulting requirements data array should be a set of both:
  // - inactive requirements: to store previous form values
  // - active requirements: update currently active form values and add new fiels
  const result = requirementsDataArrays.inactive.concat(
    updatedRequirements.map((updReq) => {
      // Should be undefined when loading for the first time or changing target currency/expected monthly donations.
      // Should always be found when refreshing << but not 100% sure how Wise behaves in all cases >>.
      const existingReqData = requirementsDataArrays.active.find(
        (x) => x.accountRequirements.type === updReq.type
      );

      // requirement type is loaded for the first time, use default values
      if (!existingReqData) {
        return {
          active: true,
          accountRequirements: updReq,
          currentFormValues: getDefaultValues(updReq, currency),
          refreshedRequirementsAdded: false,
          refreshRequired: isRefreshRequired(updReq),
        };
      }

      // requirement type is among the previously loaded requirements, update the form fields
      return getUpdatedRequirementsData(existingReqData, updReq, isRefreshed);
    })
  );

  return result;
}

/**
 * Separates requirements data array into active and inactive ones based on whether
 * the account requirements within are a member of the updated requirements array
 * @param requirementsDataArray current array of requirements data containing all previously input form state
 * @param updatedRequirements updated requirements based on newly selected currency and expected monthly donation amount
 * @returns an object containing 2 requirement data arrays separated based on whether they're active or inactive
 */
function separate(
  requirementsDataArray: RequirementsData[],
  updatedRequirements: AccountRequirements[]
): {
  inactive: RequirementsData[];
  active: RequirementsData[];
} {
  const activeRequirementsDataArray: RequirementsData[] = [];
  const inactiveRequirementsDataArray: RequirementsData[] = [];

  requirementsDataArray.forEach((prevReqData) => {
    const existingReqData = updatedRequirements.find(
      (x) => x.type === prevReqData.accountRequirements.type
    );
    if (!existingReqData) {
      inactiveRequirementsDataArray.push({
        ...prevReqData,
        active: false,
      });
    } else {
      activeRequirementsDataArray.push({
        ...prevReqData,
        active: true,
      });
    }
  });
  return {
    inactive: inactiveRequirementsDataArray,
    active: activeRequirementsDataArray,
  };
}

/**
 * Checks whether there are any new requirements to add to the form and if so, adds them and sets them
 * to the appropriate default value.
 *
 * @param currReqData current requirements data
 * @param updatedReq updated requirements that might include new requirement groups
 * @param isRefreshed flag indicating whether the fields are being processed after refreshing the requirements
 * @returns object containing previous form values with the new requirements included and set to appropriate default values AND
 * a flag indicating whether any new requirements were added to the form
 */
function getUpdatedRequirementsData(
  currReqData: RequirementsData,
  updatedReq: AccountRequirements,
  isRefreshed: boolean
): RequirementsData {
  // get current requirement groups
  const currGroups = currReqData.accountRequirements.fields.flatMap(
    (field) => field.group
  );

  // get only new requirement groups
  const newGroups = updatedReq.fields
    .flatMap((field) => field.group)
    .filter((ng) => !currGroups.find((cg) => cg.key === ng.key));

  // add new requirement groups (if any) to the current requirements
  const newRequirements: FormValues["requirements"] = newGroups.reduce(
    (curr, group) => populateRequirementGroup(curr, group),
    { ...currReqData.currentFormValues.requirements }
  );

  // update default form values
  const newFormValues: FormValues = {
    ...currReqData.currentFormValues,
    requirements: newRequirements,
  };

  let refreshRequired = false;
  if (!isRefreshed) {
    // first time loading the requirements, check if any of them require a refresh
    refreshRequired = isRefreshRequired(updatedReq);
  } else if (currReqData.accountRequirements.type !== updatedReq.type) {
    // already refreshed, but not for the current account requirement type, just use the old `refreshRequired` value
    refreshRequired = currReqData.refreshRequired;
  }

  const data: RequirementsData = {
    active: true,
    accountRequirements: updatedReq,
    currentFormValues: newFormValues,
    refreshedRequirementsAdded: !isEmpty(newGroups),
    refreshRequired,
  };
  return data;
}

function isRefreshRequired(requirements: AccountRequirements): boolean {
  return requirements.fields.some((field) =>
    field.group.some((group) => group.refreshRequirementsOnChange)
  );
}
