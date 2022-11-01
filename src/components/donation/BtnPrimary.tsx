import { BtnProps } from "./types";
import BaseBtn from "./Base";

export function BtnPrimary(props: BtnProps) {
  return (
    <BaseBtn
      {...props}
      commonStyles="max-md:text-sm p-3 rounded btn-orange normal-case"
    />
  );
}
