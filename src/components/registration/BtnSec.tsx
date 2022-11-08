import { BaseBtn, BtnProps } from "../donation";

export function BtnSec(props: BtnProps) {
  return (
    <BaseBtn
      {...props}
      commonStyles="text-sm p-3 uppercase rounded border border-gray-l2 dark:border-bluegray hover:border-gray-l1 hover:dark:border-blue-d2 font-bold font-body bg-orange-l5 dark:bg-blue-d5 text-center hover:bg-orange-l4 dark:hover:bg-blue-d3"
    />
  );
}
