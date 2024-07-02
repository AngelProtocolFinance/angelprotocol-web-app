import type { DonationIntent } from "types/aws";
import type { ChainID } from "types/chain";
import type { OptionType } from "types/components";
import type { DonationSource } from "types/lists";
import Context from "./Context";
import CurrentStep from "./CurrentStep";
import {
  initDetails,
  initDonorTitleOption,
  initTributeNotif,
} from "./common/constants";
import type {
  Config,
  DonationRecipient,
  DonationState,
  FormDonor,
  Init,
  Mode,
} from "./types";

type Components = {
  source: DonationSource;
  mode: Mode;
  config: Config | null;
  recipient: DonationRecipient;
  programId?: string;
  intent?: DonationIntent;
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
  intent,
  config,
  recipient,
  programId,
  mode,
}: Components): DonationState {
  const init: Init = {
    source,
    config,
    recipient,
    mode,
    intentId: intent?.transactionId,
  };

  if (!intent) {
    return {
      step: "donate-form",
      init,
      details: initDetails(
        init.config?.methodIds?.at(0) ?? "stripe",
        programId
      ),
    };
  }

  const program: OptionType<string> = {
    //label would be replaced once program options are loaded
    label: "General donation",
    value: intent.programId ?? programId ?? "",
  };

  const { email, firstName, lastName, ...d } = intent.donor;
  const formDonor: FormDonor = {
    email,
    firstName,
    lastName,
    ukTaxResident: d.address?.country === "United Kingdom",
    title: d.title ? { label: d.title, value: d.title } : initDonorTitleOption,
    streetAddress: d.address?.streetAddress ?? "",
    zipCode: d.address?.zipCode ?? "",
  };

  if ("chainId" in intent) {
    return {
      init,
      step: "submit",
      details: {
        method: "crypto",
        chainId: intent.chainId as ChainID,
        token: {
          amount: `${intent.amount}`,
          ...intent.token,
        },

        program,
      },
      liquidSplitPct: intent.splitLiq,
      tip: { value: intent.tipAmount, format: "pct" },
      donor: formDonor,
      honorary: {
        withHonorary: !!intent.inHonorOf,
        honoraryFullName: intent.inHonorOf ?? "",
        withTributeNotif: !!intent.tributeNotif,
        tributeNotif: intent.tributeNotif ?? initTributeNotif,
      },
    };
  }
  return {
    init,
    step: "submit",
    details: {
      method: "stripe",
      amount: `${intent.amount}`,
      currency: {
        code: intent.currency.currency_code,
        min: intent.currency.minimum_amount,
        rate: intent.currency.rate,
      },
      frequency: intent.frequency,
      program,
    },
    liquidSplitPct: intent.splitLiq,
    tip: { value: intent.tipAmount, format: "pct" },
    donor: formDonor,
    honorary: {
      withHonorary: !!intent.inHonorOf,
      honoraryFullName: intent.inHonorOf ?? "",
      withTributeNotif: !!intent.tributeNotif,
      tributeNotif: intent.tributeNotif ?? initTributeNotif,
    },
  };
}
