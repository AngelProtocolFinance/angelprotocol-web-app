import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  acknowledger?: ReactNode;
}
export function DefaultFallback({ acknowledger }: Props) {
  return (
    <div className="grid place-items-center content-center gap-6 p-4">
      <CircleAlert className="text-red text-[2em]" />
      <p className="text-center">{GENERIC_ERROR_MESSAGE}</p>
      {acknowledger}
    </div>
  );
}
