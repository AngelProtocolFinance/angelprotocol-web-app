import { PropsWithChildren, useEffect, useState } from "react";
import { TokenWithAmount } from "types/slices";
import { WithWallet } from "contexts/WalletContext";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { BtnPrimary, BtnSec } from "components/donation";
import { BtnOutline } from "components/donation/BtnOutline";
import { useSetter } from "store/accessors";
import { Estimate, SubmitStep, setStep } from "slices/donation";
import { sendDonation } from "slices/donation/sendDonation";
import { humanize } from "helpers";
import { chains } from "constants/chains";
import { appRoutes } from "constants/routes";
import { estimateDonation } from "./estimateDonation";
import getBreakdown from "./getBreakdown";

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

  function submit(estimate: Estimate) {
    const { wallet, ...donation } = props;
    dispatch(sendDonation({ donation, estimate }));
  }

  const { token } = props.details;
  const chain = chains[props.wallet.chainId];
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
        <span>{chain.name}</span>
      </Row>
      <Row title="Amount:">
        {token.symbol} {humanize(fromBal, 4)}
      </Row>
      {fromGift ? (
        <Row title="Giftcard:">
          {token.symbol} {humanize(fromGift, 4)}
        </Row>
      ) : null}
      <TxTotal estimate={estimate} token={token} />
      <div className="mt-14 grid grid-cols-2 gap-5">
        <BtnSec onClick={goBack} type="button">
          Back
        </BtnSec>
        <BtnPrimary
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
        </BtnPrimary>
        <BtnOutline
          as="link"
          to={appRoutes.profile + `/${endowId}`}
          className="col-span-full"
        >
          Cancel
        </BtnOutline>
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
      className={`${classes} py-3 text-gray-d1 dark:text-gray flex items-center justify-between w-full border-b border-gray-l2 dark:border-bluegray last:border-none`}
    >
      <p className="text-gray-d2 dark:text-white">{title}</p>
      {children}
    </div>
  );
}
