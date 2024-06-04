import type { DonationIntent } from "types/aws";
import type { ChainID } from "types/chain";
import type { OptionType } from "types/components";
import type { DonationSource } from "types/lists";
import Context from "./Context";
import CurrentStep from "./CurrentStep";
import {
  initChainIdOption,
  initTokenOption,
  usdOption,
} from "./common/constants";
import type {
  Config,
  DonationDetails,
  DonationRecipient,
  DonationState,
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
    const program: OptionType<string> = {
      //label would be replaced once program options are loaded
      label: "General Donation",
      value: programId ?? "",
    };

    const initDetails: DonationDetails = (() => {
      switch (config?.methodIds?.at(0)) {
        case "crypto": {
          return {
            method: "crypto",
            token: initTokenOption,
            program,
            chainId: initChainIdOption,
          };
        }
        case "daf": {
          return { method: "daf", amount: "", currency: usdOption, program };
        }
        case "stripe": {
          return {
            method: "stripe",
            amount: "",
            currency: usdOption,
            frequency: "subscription",
            program,
          };
        }
        default: {
          return {
            method: "stocks",
            numShares: "",
            program,
            symbol: "",
          };
        }
      }
    })();

    return {
      step: "donate-form",
      init,
      details: initDetails,
    };
  }

  const program: OptionType<string> = {
    //label would be replaced once program options are loaded
    label: "General donation",
    value: intent.programId ?? programId ?? "",
  };

  if ("chainId" in intent) {
    return {
      init,
      step: "submit",
      details: {
        method: "crypto",
        chainId: {
          label: intent.chainName,
          value: intent.chainId as ChainID,
        },
        token: {
          amount: `${intent.amount}`,
          ...intent.token,
        },

        program,
      },
      liquidSplitPct: intent.splitLiq,
      tip: { value: intent.tipAmount, format: "pct" },
      donor: intent.donor,
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
    donor: intent.donor,
  };
}
