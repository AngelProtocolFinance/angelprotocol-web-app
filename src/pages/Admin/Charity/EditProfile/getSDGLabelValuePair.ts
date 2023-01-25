import { UNSDG_NUMS } from "types/lists";
import { OptionType } from "components/Selector";

export const getSDGLabelValuePair = (
  key: string | number,
  title: string
): OptionType<UNSDG_NUMS> => ({
  label: `${key} - ${title}`,
  value: Number(key) as UNSDG_NUMS,
});
