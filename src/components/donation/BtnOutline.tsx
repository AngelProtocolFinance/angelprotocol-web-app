import { BtnProps } from "./types";
import BaseBtn from "./Base";

export function BtnOutline(props: BtnProps) {
  return (
    <BaseBtn
      {...props}
      commonStyles="max-md:text-sm p-3 rounded border border-gray-l2 dark:border-bluegray-d1 text-center hover:border-gray-l1 hover:dark:border-blue-d2"
    />
  );
}
