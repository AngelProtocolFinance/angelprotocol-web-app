import { EndowDesignation } from "types/aws";
import { OptionType } from "components/Selector";
import { ENDOW_DESIGNATIONS } from "constant/common";

export const getEndowDesignationLabelValuePair = (
  value: EndowDesignation
): OptionType<EndowDesignation> => {
  const label =
    ENDOW_DESIGNATIONS.find((option) => option.value === value)?.label || value;
  return {
    label,
    value,
  };
};
