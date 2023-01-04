import { PropsWithChildren, useEffect, useState } from "react";
import { Estimate } from "./types";
import { TokenWithAmount } from "types/slices";
import { WithCosmosWallet } from "contexts/WalletContext";
import { BtnOutline, BtnPrim, BtnSec, Tooltip } from "components/gift";
import { useSetter } from "store/accessors";
import { SubmitStep, setStep } from "slices/gift";
import { purchase } from "slices/gift/purchase";
import { humanize } from "helpers";
import { chains } from "constants/chains";
import { appRoutes } from "constants/routes";
import { estimateTx } from "./estimateTx";

type EstimateStatus = Estimate | "loading" | "error";

export default function Submit(props: WithCosmosWallet<SubmitStep>) {
  const dispatch = useSetter();
  const [estimate, setEstimate] = useState<EstimateStatus>("loading");

  useEffect(() => {
    (async () => {
      setEstimate("loading");
      const _estimate = await estimateTx(props);
      setEstimate(_estimate || "error");
    })();
  }, [props]);

  function goBack() {
    dispatch(setStep(props.step - 1));
  }

  function submit({ tx }: Estimate) {
    dispatch(purchase({ wallet: props.wallet, tx, details: props.details }));
  }

  const { token } = props.details;
  const chain = chains[props.wallet.chainId];

  const isNotEstimated = estimate === "error" || estimate === "loading";

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
        <span>{chain.name}</span>
      </Row>
      <Row title="Amount:">
        <span>
          {token.symbol} {humanize(token.amount, 4)}
        </span>
      </Row>
      <TxTotal estimate={estimate} token={token} />
      <div className="mt-12 grid grid-cols-2 gap-5">
        <BtnSec onClick={goBack} type="button">
          Back
        </BtnSec>
        <BtnPrim
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
        </BtnPrim>
        <BtnOutline
          as="link"
          to={appRoutes.marketplace}
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
          <Tooltip
            type="Info"
            message="This transaction is likely to fail"
            classes="my-3 text-red dark:text-red-l2"
          />
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
          <Tooltip
            type="Loading"
            message="Estimating transaction cost.."
            classes="my-6"
          />
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
