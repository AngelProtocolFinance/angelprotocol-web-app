import type { OptionType } from "types/components";

export const valueKey: keyof OptionType<any> = "value";

export const styles = {
  selectorButton: "flex items-center field-input min-h-[3rem] justify-between",
  error:
    "absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2",
  option:
    "px-4 py-2 data-selected:bg-(--accent-secondary) hover:cursor-pointer hover:bg-(--accent-secondary)",
  options:
    "font-heading rounded-xs border border-gray-l4 absolute top-full mt-2 z-10 bg-gray-l6 dark:bg-blue-d6 w-full max-h-[10rem] overflow-y-auto scroller",
};
