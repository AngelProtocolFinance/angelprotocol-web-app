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
  TDonation,
} from "./types";

type Components = {
  source: DonationSource;
  mode: Mode;
  config: Config | null;
  recipient: DonationRecipient;
  user: IUser | undefined;
  program: IProgram | undefined;
};

type InitState = {
  init: TDonation;
};

type Props = {
  className?: string;
} & (Components | InitState);

export function Donation({ className = "", ...props }: Props) {
  const tdonation = "init" in props ? props.init : init_state(props);
  const colors: Record<string, string | undefined> = {
    "--accent-primary": tdonation.config?.accentPrimary,
    "--accent-secondary": tdonation.config?.accentSecondary,
  };
  return (
    <div
      style={colors}
      className={`grid ${className} content-start w-full @container/steps overflow-clip bg-white min-h-96`}
    >
      <Context {...tdonation}>
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
  program,
}: Components): TDonation {
  const init: Init = {
    source,
    config,
    recipient,
    mode,
    user,
    program,
  };

  return {
    ...init,
    method: config?.method_ids?.[0] ?? "stripe",
  };
}
