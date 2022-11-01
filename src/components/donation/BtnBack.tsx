import { BtnCancel, BtnCancelProps } from "./BtnCancel";

export function BtnBack(props: BtnCancelProps) {
  return (
    <BtnCancel
      {...props}
      className="bg-orange-l5 dark:bg-blue-d5 text-center hover:bg-orange-l4 dark:hover:bg-blue-d3"
    />
  );
}
