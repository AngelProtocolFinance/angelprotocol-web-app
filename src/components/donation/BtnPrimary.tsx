import { BtnProps } from "./types";
import BaseBtn from "./BaseBtn";

export function BtnPrimary(props: BtnProps) {
  return (
    <BaseBtn
      {...props}
      commonStyles="text-sm md:text-base p-3 rounded btn-orange font-body"
      style={{ textTransform: "lowercase" }}
    />
  );
}
