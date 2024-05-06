import Context from "./Context";
import CurrentStep from "./CurrentStep";
import type { DonationState } from "./types";

export function Steps(props: DonationState & { className?: string }) {
  return (
    <div
      className={`grid ${
        props.className ?? ""
      } w-full @container/steps overflow-clip bg-white min-h-96`}
    >
      <Context {...props}>
        <CurrentStep />
      </Context>
    </div>
  );
}
