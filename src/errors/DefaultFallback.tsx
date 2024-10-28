import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { CircleAlert } from "lucide-react";

export default function DefaultFallback() {
  return (
    <div className="grid place-items-center content-center gap-6 p-4">
      <CircleAlert className="text-red text-[2em]" />
      <p className="text-center">{GENERIC_ERROR_MESSAGE}</p>
    </div>
  );
}
