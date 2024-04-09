import { OptionType } from "types/components";

export const valueKey: keyof OptionType<any> = "value";

export const styles = {
  selectorButton:
    "flex items-center field-input min-h-[3rem] justify-between cursor-pointer",
  error:
    "absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2",
  //FUTURE: import OptionRenderArg once available
  option: (selected: boolean, active: boolean) =>
    `px-4 py-2 cursor-pointer ${
      selected
        ? "bg-blue-l2  dark:bg-blue-d1"
        : active
          ? "cursor-pointer bg-blue-l3 dark:bg-blue-d2"
          : ""
    }`,
  options:
    "font-heading rounded-sm border border-gray-l4 absolute top-full mt-2 z-10 bg-gray-l6 dark:bg-blue-d6 w-full max-h-[10rem] overflow-y-auto scroller",
};
