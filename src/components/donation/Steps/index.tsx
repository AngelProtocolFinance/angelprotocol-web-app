import type { DonationRecord } from "types/aws";
import Context from "./Context";
import CurrentStep from "./CurrentStep";
import type { Config, DonationRecipient, DonationState } from "./types";

type Props = {
  config: Config | null;
  recipient: DonationRecipient;
  intentRecord?: DonationRecord;
  className?: string;
};

export function Steps(props: Props) {
  return (
    <div
      className={`grid ${
        props.className ?? ""
      } w-full @container/steps overflow-clip bg-white min-h-96`}
    >
      <Context {...initialState(props)}>
        <CurrentStep />
      </Context>
    </div>
  );
}

function initialState({
  intentRecord: intent,
  config,
  recipient,
}: Omit<Props, "className">): DonationState {
  if (!intent) {
    return {
      step: "donate-form",
      config,
      recipient,
      intentId: undefined,
    };
  }
}
