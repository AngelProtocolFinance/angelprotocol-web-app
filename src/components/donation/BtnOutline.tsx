import { BtnProps } from "./types";
import { BaseBtn } from "./BaseBtn";

export function BtnOutline(props: BtnProps) {
  return (
    <BaseBtn
      {...props}
      commonStyles="text-sm md:text-base p-3 rounded border border-gray-l2 dark:border-bluegray text-center hover:border-gray-l1 hover:dark:border-blue-d2 font-bold font-body"
    />
  );
}
