import { FormValues, RequirementsData } from "../types";
import { AccountRequirements } from "types/aws";
import { isEmpty } from "helpers";
import { getDefaultValues, populateRequirementGroup } from "./getDefaultValues";

export default function mergeRequirements(
  prev: RequirementsData[],
  updatedRequirements: AccountRequirements[],
  targetCurrency: string,
  isRefreshing = false
): RequirementsData[] {
  const activeRequirementsDataArray: RequirementsData[] = [];
  const inactiveRequirementsDataArray: RequirementsData[] = [];

  prev.forEach((prevReqData) => {
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

  return inactiveRequirementsDataArray.concat(
    updatedRequirements.map((updReq) => {
      // Should be undefined when loading for the first time or changing target currency/expected monthly donations.
      // Should always be found when refreshing << but not 100% sure how Wise behaves in all cases >>.
      const existingReqData = activeRequirementsDataArray.find(
        (x) => x.accountRequirements.type === updReq.type
      );

      // requirement type is loaded for the first time, use default values
      if (!existingReqData) {
        return {
          active: true,
          accountRequirements: updReq,
          currentFormValues: getDefaultValues(updReq, targetCurrency),
          refreshedRequirementsAdded: false,
          refreshRequired: isRefreshRequired(updReq),
        };
      }

      // requirement type is among the previously loaded requirements, update the form fields
      return getUpdatedRequirementsData(existingReqData, updReq, isRefreshing);
    })
  );
}

/**
 * Checks whether there are any new requirements to add to the form and if so, adds them and sets them
 * to the appropriate default value.
 *
 * @param currReqData current requirements data
 * @param updatedReq updated requirements that might include new requirement groups
 * @returns object containing previous form values with the new requirements included and set to appropriate default values AND
 * a flag indicating whether any new requirements were added to the form
 */
function getUpdatedRequirementsData(
  currReqData: RequirementsData,
  updatedReq: AccountRequirements,
  isRefreshing: boolean
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

  const data: RequirementsData = {
    active: true,
    accountRequirements: updatedReq,
    currentFormValues: newFormValues,
    refreshedRequirementsAdded: !isEmpty(newGroups),
    refreshRequired: isRefreshing
      ? currReqData.accountRequirements.type === updatedReq.type
        ? false // just finished checking requirements for selected type, so no need to do it again
        : currReqData.refreshRequired // just copy/paste for other types
      : isRefreshRequired(updatedReq),
  };
  return data;
}

function isRefreshRequired(requirements: AccountRequirements): boolean {
  return requirements.fields.some((field) =>
    field.group.some((group) => group.refreshRequirementsOnChange)
  );
}
