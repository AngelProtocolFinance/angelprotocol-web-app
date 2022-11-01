import { PropsWithChildren, useEffect, useState } from "react";
import { Estimate } from "./types";
import { WithWallet } from "contexts/WalletContext";
import { Tooltip } from "components/donation";
import { useSetter } from "store/accessors";
import { SubmitStep, TokenWithAmount, setStep } from "slices/donation";
import { sendDonation } from "slices/transaction/transactors";
import { humanize } from "helpers";
import { estimateDonation } from "./estimateDonation";

type EstimateStatus = Estimate | "loading" | "error";

export default function Submit(props: WithWallet<SubmitStep>) {
  const dispatch = useSetter();

  const [estimate, setEstimate] = useState<EstimateStatus>("loading");

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
      <Row title="Currency:">
        <img
          alt=""
          className="ml-auto object-cover h-4 w-4 rounded-full mr-1"
          src={token.logo}
        />
        <span>{token.symbol}</span>
      </Row>
      <Row title="Blockchain:">
        <span>{chain.chain_name}</span>
      </Row>
      <Row title="Amount:">
        <span>
          {token.symbol} {humanize(token.amount, 4)}
        </span>
      </Row>
      <TxTotal estimate={estimate} token={token} />
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

function TxTotal({
  estimate,
  token,
}: {
  estimate: EstimateStatus;
  token: TokenWithAmount;
}) {
  switch (estimate) {
    case "error":
      return (
        <>
          <Row title="Transaction costs:">
            <span className="text-red dark:text-red-l2">0.0000</span>
          </Row>
          <Row title="TOTAL">
            <span className="text-red dark:text-red-l2">
              {token.symbol} {humanize(token.amount, 4)}
            </span>
          </Row>
          <Tooltip type="Info" message="This transaction is likely to fail" />
        </>
      );
    case "loading":
      return (
        <>
          <Row title="Transaction costs:">
            <span>----</span>
          </Row>
          <Row title="TOTAL">
            <span>
              {token.symbol} {humanize(token.amount, 4)}
            </span>
          </Row>
        </>
      );
    default:
      const { fee } = estimate;
      const total =
        fee.symbol === token.symbol
          ? +token.amount + +fee.amount
          : +token.amount;

      return (
        <>
          <Row title="Transaction costs:">
            {fee.symbol} {humanize(fee.amount, 4)}
          </Row>
          <Row title="TOTAL">
            <span>
              {token.symbol} {humanize(total, 4)}
            </span>
          </Row>
        </>
      );
  }
}

function Row({
  title,
  children,
  classes = "",
}: PropsWithChildren<{ classes?: string; title: string }>) {
  return (
    <div
      className={`${classes} py-3 text-gray-d1 dark:text-gray flex items-center justify-between w-full border-b border-gray-l2 dark:border-bluegray-d1 last:border-none`}
    >
      <p className="text-gray-d2 dark:text-white">{title}</p>
      {children}
    </div>
  );
}
