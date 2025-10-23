import type { DonationSource } from "types/lists";
import { Context } from "./context";
import { CurrentStep } from "./current-step";
import type {
  Config,
  DonationRecipient,
  DonationState,
  IProgram,
  IUser,
  Init,
  Mode,
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
  init: DonationState;
};

type Props = {
  className?: string;
} & (Components | InitState);

export function Steps({ className = "", ...props }: Props) {
  return (
    <div
      className={`grid ${className} w-full @container/steps overflow-clip bg-white min-h-96`}
    >
      <Context {...("init" in props ? props.init : initialState(props))}>
        <CurrentStep />
      </Context>
    </div>
  );
}

function initialState({
  source,
  config,
  recipient,
  mode,
  user,
}: Components): DonationState {
  const init: Init = {
    source,
    config,
    recipient,
    mode,
    user,
  };

  return {
    init,
    step: "donate-form",
  };
}
