import { PropsWithChildren, useEffect, useState } from "react";
import { Estimate } from "./types";
import { WithWallet } from "contexts/WalletContext";
import { useSetter } from "store/accessors";
import { SubmitStep, setStep } from "slices/donation";
import { sendDonation } from "slices/transaction/transactors";
import { estimateDonation } from "./estimateDonation";

export default function Submit(props: WithWallet<SubmitStep>) {
  const dispatch = useSetter();

  const [estimate, setEstimate] = useState<Estimate | "loading" | "error">(
    "loading"
  );

  useEffect(() => {
    (async () => {
      setEstimate("loading");
      const _estimate = await estimateDonation(props);
      setEstimate(_estimate || "error");
    })();
  }, [props]);

  function goBack() {
    dispatch(setStep(props.step - 1));
  }

  function submit() {
    const { wallet, ...donation } = props;
    dispatch(sendDonation({ donation, wallet, tx: (estimate as any).tx }));
  }

  const { token } = props.details;
  const { chain } = props.wallet;
  return (
    <div>
      <Row title="Currency:" classes="py-3">
        <img
          className="ml-auto object-cover h-4 w-4 rounded-full mr-1"
          src={token.logo}
        />
        <span className="text-gray-d1 dark:text-gray">{token.symbol}</span>
      </Row>
      <Row title="Blockchain:" classes="py-3">
        <span className="text-gray-d1 dark:text-gray">{chain.chain_name}</span>
      </Row>
      <div>SUBMIT UI</div>
      <div>
        <button type="button" onClick={submit}>
          submit data
        </button>
        <button onClick={goBack}>back to kyc form</button>
      </div>
    </div>
  );
}

function Row({
  title,
  children,
  classes = "",
}: PropsWithChildren<{ classes?: string; title: string }>) {
  return (
    <div
      className={`${classes} flex items-center justify-between w-full border-b border-bluegray-d1 last:border-none`}
    >
      <p>{title}</p>
      {children}
    </div>
  );
}
