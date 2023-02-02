import { useConnectedWallet } from "@terra-money/wallet-provider";
import { PropsWithChildren, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Estimate } from "./types";
import { TokenWithAmount } from "types/slices";
import { WithWallet } from "contexts/WalletContext";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { useSetter } from "store/accessors";
import { SubmitStep, setStep } from "slices/donation";
import { sendDonation } from "slices/donation/sendDonation";
import { humanize } from "helpers";
import { appRoutes } from "constants/routes";
import { estimateDonation } from "./estimateDonation";
import getBreakdown from "./getBreakdown";

type EstimateStatus = Estimate | "loading" | "error";

export default function Submit(props: WithWallet<SubmitStep>) {
  const dispatch = useSetter();
  const terraWallet = useConnectedWallet();
  const [estimate, setEstimate] = useState<EstimateStatus>("loading");

  useEffect(() => {
    (async () => {
      setEstimate("loading");
      const _estimate = await estimateDonation({ ...props, terraWallet });
      setEstimate(_estimate || "error");
    })();
  }, [props, terraWallet]);

  function goBack() {
    dispatch(setStep(props.step - 1));
  }

  function submit({ tx }: Estimate) {
    const { wallet, ...donation } = props;
    dispatch(sendDonation({ donation, wallet, tx }));
  }

  const { token } = props.details;
  const { chain } = props.wallet;
  const { id: endowId } = props.recipient;

  const isNotEstimated = estimate === "error" || estimate === "loading";

  const { fromBal, fromGift } = getBreakdown(token);

  return (
    <div className="grid content-start">
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
          {token.symbol} {humanize(fromBal, 4)}
        </span>
      </Row>
      {fromGift ? (
        <Row title="Giftcard:">
          {token.symbol} {humanize(fromGift, 4)}
        </Row>
      ) : null}
      <TxTotal estimate={estimate} token={token} />
      <div className="mt-14 grid grid-cols-2 gap-5">
        <button
          className="btn-outline-filled btn-donate"
          onClick={goBack}
          type="button"
        >
          Back
        </button>
        <button
          className="btn-orange btn-donate"
          onClick={
            isNotEstimated
              ? undefined
              : () => {
                  submit(estimate);
                }
          }
          disabled={isNotEstimated}
          type="submit"
        >
          Complete
        </button>
        <Link
          to={appRoutes.profile + `/${endowId}`}
          className="col-span-full btn-outline btn-donate"
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
          <LoadingStatus classes="justify-self-center my-6">
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
      className={`${classes} py-3 text-gray-d1 dark:text-gray flex items-center justify-between w-full border-b border-prim last:border-none`}
    >
      <p className="text-gray-d2 dark:text-white">{title}</p>
      {children}
    </div>
  );
}
