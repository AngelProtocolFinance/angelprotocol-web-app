import { UNSDG_NUMS } from "types/lists";
import { OptionType } from "components/Selector";

export const getSDGLabelValuePair = (
  key: string,
  title: string
): OptionType<UNSDG_NUMS> => ({
  label: `${key} - ${title}`,
  value: +key as UNSDG_NUMS,
});
