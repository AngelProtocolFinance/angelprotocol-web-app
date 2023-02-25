import { OptionType } from "@giving/components/Selector";
import { UNSDG_NUMS } from "@giving/types/lists";

export const getSDGLabelValuePair = (
  key: string | number,
  title: string
): OptionType<UNSDG_NUMS> => ({
  label: `${key} - ${title}`,
  value: Number(key) as UNSDG_NUMS,
});
