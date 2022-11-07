import { BtnProps } from "../donation/types";
import BaseBtn from "../donation/BaseBtn";

export function BtnPrim(props: BtnProps) {
  return (
    <BaseBtn
      {...props}
      commonStyles="text-sm p-3 rounded btn-orange font-body rounded"
    />
  );
}
