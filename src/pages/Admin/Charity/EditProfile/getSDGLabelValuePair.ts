import { OptionType } from "types/components";
import { UNSDG_NUMS } from "types/lists";

export const getSDGLabelValuePair = (
  key: string | number,
  title: string,
): OptionType<UNSDG_NUMS> => ({
  label: `${key} - ${title}`,
  value: Number(key) as UNSDG_NUMS,
});
