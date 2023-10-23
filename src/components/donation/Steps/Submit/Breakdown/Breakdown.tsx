import { PropsWithChildren, useEffect } from "react";
import { EstimateStatus } from "../types";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { SubmitStep } from "slices/donation";
import { humanize } from "helpers";
import { estimateDonation } from "./estimateDonation";

type Props = {
  estimate: EstimateStatus;
  setEstimate: React.Dispatch<React.SetStateAction<EstimateStatus>>;
  sender: string;
  submitStep: SubmitStep;
};

export default function Breakdown({
  estimate,
  setEstimate,
  sender,
  submitStep,
}: Props) {
  useEffect(() => {
    (async () => {
      setEstimate("loading");
      //1. fetch balances
      // if token.amount < balance
      const newEstimate = await estimateDonation({ ...submitStep, sender });

      if (!newEstimate) {
        return setEstimate({
          error: "Simulation failed: Transaction is likely to fail",
        });
      }
      //if amount + fee.amount > balance, error
      setEstimate(newEstimate);
    })();
  }, [sender, submitStep]);

  const token = submitStep.details.token;
  if (estimate === "loading") {
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
        <LoadingStatus classes="justify-self-center my-6">
          Estimating transaction cost..
        </LoadingStatus>
      </>
    );
  }

  if ("error" in estimate) {
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
        <ErrorStatus classes="my-3 justify-self-center">
          {estimate.error}
        </ErrorStatus>
      </>
    );
  }

  return (
    <>
      {estimate.items
        .filter((i) => i.fiatAmount > 0)
        .map((item, i) => (
          <Row key={i} title={item.name}>
            {item.cryptoAmount ? (
              <div className="grid justify-items-end">
                <span>
                  {humanize(item.cryptoAmount.value, 4)}{" "}
                  {item.cryptoAmount.symbol}
                </span>
                <span className="text-xs"> {item.prettyFiatAmount}</span>
              </div>
            ) : (
              `${item.prettyFiatAmount}`
            )}
          </Row>
        ))}
    </>
  );
}

function Row({
  title,
  children,
  classes = "",
}: PropsWithChildren<{ classes?: string; title: string }>) {
  return (
    <div
      className={`${classes} py-3 text-gray-d1 dark:text-gray flex items-center justify-between w-full border-b border-prim last:border-none`}
    >
      <p className="text-gray-d2 dark:text-white">{title}</p>
      {children}
    </div>
  );
}
