import { EndowDesignation } from "types/aws";
import { OptionType } from "components/Selector";
import { ENDOW_DESIGNATIONS } from "constants/common";

export const getEndowDesignationLabelValuePair = (
  value: EndowDesignation
): OptionType<string> => {
  const label =
    ENDOW_DESIGNATIONS.find((option) => option.value === value)?.label || value;
  return {
    label,
    value,
  };
};
