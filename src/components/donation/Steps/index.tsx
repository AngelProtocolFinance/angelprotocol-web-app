import type { DonationIntent } from "types/aws";
import type { ChainID } from "types/chain";
import Context from "./Context";
import CurrentStep from "./CurrentStep";
import type {
  DonationRecipient,
  DonationState,
  Init,
  Mode,
  WidgetConfig,
} from "./types";

type Components = {
  mode: Mode;
  widgetConfig: WidgetConfig | null;
  recipient: DonationRecipient;
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
  intent,
  widgetConfig,
  recipient,
  mode,
}: Components): DonationState {
  const init: Init = { widgetConfig, recipient, mode };

  if (!intent) return { step: "donate-form", init };

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
      },
      liquidSplitPct: intent.splitLiq,
      tip: { value: intent.tipAmount, format: "pct" },
      donor: intent.donor,
      intentId: intent.transactionId,
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
    },
    liquidSplitPct: intent.splitLiq,
    tip: { value: intent.tipAmount, format: "pct" },
    donor: intent.donor,
    intentId: intent.transactionId,
  };
}
