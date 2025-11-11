import { donor_address_init, donor_init } from "types/donation-intent";
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
  const state = "init" in props ? props.init : init_state(props);

  const styles: Record<string, string | undefined> = {
    "--accent-primary": state?.config?.accent_primary,
    "--accent-secondary": state?.config?.accent_secondary,
  };

  return (
    <div
      id="donation-container"
      style={styles}
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

  const donor_init_prefilled = user
    ? {
        ...donor_init,
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        email: user.email ?? "",
      }
    : donor_init;

  return {
    ...init,
    donor: recipient.donor_address_required
      ? //define with invalid address to force user to fill it out
        { ...donor_init_prefilled, address: donor_address_init }
      : donor_init_prefilled,
    method: config?.method_ids?.[0] ?? "stripe",
  };
}
