import type { DonationIntent } from "types/aws";
import Context from "./Context";
import CurrentStep from "./CurrentStep";
import type { Config, DonationRecipient, DonationState } from "./types";
import { ChainID } from "types/chain";

type Props = {
  config: Config | null;
  recipient: DonationRecipient;
  intent?: DonationIntent;
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
  intent,
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

  if ("walletAddress" in intent) {
    return {
      step: "submit",
      recipient,
      intentId: intent.transactionId,
      config: null,
      details: {
        method: "crypto",
        chainId: {
          label: intent.chainName,
          value: intent.chainId as ChainID,
        },
        source: intent.source,
        token: {
          amount: `${intent.amount}`,
          ...intent.token,
        },
      },
      liquidSplitPct: intent.splitLiq,


     
      tip: intent.tipAmount,
      format: "pct",
      donor: intent.donor,
    
     
    };
  }
  return {
    step: "submit",
    recipient: recipient,
    intentId: intent.transactionId,
    config: null,
    details: {
      method: "stripe",
      amount: `${intent.amount}`,
      currency: {
        code: intent.currency.currency_code,
        min: intent.currency.minimum_amount,
        rate: intent.currency.rate,
      },
      frequency: intent.frequency,
      source: intent.source,
    },
    liquidSplitPct: intent.splitLiq,
    tip: intent.tipAmount,
    format: "pct",
    donor: intent.donor,
  
  

  };


}
