import Image from "components/Image";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { appRoutes } from "constants/routes";
import { humanize } from "helpers";
import { PropsWithChildren, useState } from "react";
import { Link } from "react-router-dom";
import { SubmitStep, setStep } from "slices/gift";
import { useSetter } from "store/accessors";
import { TokenWithAmount } from "types/tx";
import { WithWallet } from "types/wallet";
import CompleteBtn from "./CompleteBtn";
import { EstimateStatus } from "./types";

export default function Submit(props: WithWallet<SubmitStep>) {
  const dispatch = useSetter();
  const [estimate] = useState<EstimateStatus>("loading");

  function goBack() {
    dispatch(setStep(props.step - 1));
  }

  const { token } = props.details;

  return (
    <div className="grid content-start">
      <Row title="Currency:">
        <Image
          className="ml-auto object-cover h-4 w-4 rounded-full mr-1"
          src={token.logo}
        />
        <span>{token.symbol}</span>
      </Row>
      <Row title="Blockchain:">
        <span>Chain name</span>
      </Row>
      <Row title="Amount:">
        <span>
          {token.symbol} {humanize(token.amount, 4)}
        </span>
      </Row>
      <TxTotal estimate={estimate} token={token} />
      <div className="mt-12 grid grid-cols-2 gap-5">
        <button
          className="btn-outline-filled btn-gift"
          onClick={goBack}
          type="button"
        >
          Back
        </button>
        <CompleteBtn {...props} estimate={estimate} />
        <Link
          to={appRoutes.marketplace}
          className="btn-gift btn-outline-filled col-span-full"
        >
          Cancel
        </Link>
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
          <ErrorStatus classes="my-3 justify-self-center">
            This transaction is likely to fail
          </ErrorStatus>
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
          <LoadingStatus classes="my-6 justify-self-center">
            Estimating transaction cost..
          </LoadingStatus>
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
      className={`${classes} py-3 text-gray-d1 dark:text-gray flex items-center justify-between w-full border-b border-gray-l4 last:border-none`}
    >
      <p className="text-gray-d2 dark:text-white">{title}</p>
      {children}
    </div>
  );
}
