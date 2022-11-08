import { BaseBtn, BtnProps } from "../donation";

export function BtnPrim(props: BtnProps) {
  return (
    <BaseBtn
      {...props}
      commonStyles="text-sm p-3 rounded btn-orange font-body rounded"
    />
  );
}
