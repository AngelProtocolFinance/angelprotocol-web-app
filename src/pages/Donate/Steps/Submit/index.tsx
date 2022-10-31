import { useEffect, useState } from "react";
import { Estimate } from "./types";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import { SubmitStep, setStep } from "slices/donation";
import { sendDonation } from "slices/transaction/transactors";
import { estimateDonation } from "./estimateDonation";

export default function Submit(props: SubmitStep & { wallet: WalletState }) {
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

  return (
    <div>
      <div>{JSON.stringify(estimate)}</div>
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
