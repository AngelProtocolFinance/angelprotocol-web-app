import { useEffect, useState } from "react";
import { Estimate } from "./types";
import { EstimatedTx } from "slices/transaction/types";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import { Step3, setStep } from "slices/donation";
import { estimateDonation } from "./estimateDonation";

export default function Submit(props: Step3 & { wallet: WalletState }) {
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

  function submit(tx: EstimatedTx) {
    // dispatch(sendDonation({ donation: props , tx:}));
  }

  return (
    <div>
      <div>{JSON.stringify(estimate)}</div>
      <div>SUBMIT UI</div>
      <div>
        <button>submit data</button>
        <button onClick={goBack}>back to kyc form</button>
      </div>
    </div>
  );
}
