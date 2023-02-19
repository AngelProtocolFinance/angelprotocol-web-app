import { OptionType } from "@ap/components/selector";
import { UNSDG_NUMS } from "@ap/types";

export const getSDGLabelValuePair = (
  key: string | number,
  title: string
): OptionType<UNSDG_NUMS> => ({
  label: `${key} - ${title}`,
  value: Number(key) as UNSDG_NUMS,
});
