import { OptionType } from "@giving/types/components/selector";
import { UNSDG_NUMS } from "@giving/types/lists";

export const getSDGLabelValuePair = (
  key: string | number,
  title: string
): OptionType<UNSDG_NUMS> => ({
  label: `${key} - ${title}`,
  value: Number(key) as UNSDG_NUMS,
});
