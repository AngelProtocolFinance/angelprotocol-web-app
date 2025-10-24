import type { DonationSource } from "types/lists";
import { Context } from "./context";
import { CurrentStep } from "./current-step";
import type {
  Config,
  DonationRecipient,
  IProgram,
  IUser,
  Init,
  Mode,
  TDonationState,
} from "./types";

type Components = {
  source: DonationSource;
  mode: Mode;
  config: Config | null;
  recipient: DonationRecipient;
  user?: IUser;
  program?: IProgram;
};

type InitState = {
  init: TDonationState;
};

type Props = {
  className?: string;
} & (Components | InitState);

export function Donation({ className = "", ...props }: Props) {
  return (
    <div
      className={`grid ${className} w-full @container/steps overflow-clip bg-white min-h-96`}
    >
      <Context {...("init" in props ? props.init : init_state(props))}>
        <CurrentStep />
      </Context>
    </div>
  );
}

function init_state({
  source,
  config,
  recipient,
  mode,
  user,
}: Components): TDonationState {
  const init: Init = {
    source,
    config,
    recipient,
    mode,
    user,
  };

  return {
    method: config?.method_ids?.[0] ?? "stripe",
    init,
  };
}
