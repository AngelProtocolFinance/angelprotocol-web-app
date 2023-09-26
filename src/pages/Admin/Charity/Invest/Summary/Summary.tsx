import { PropsWithChildren, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SummaryProps } from "../types";
import { TokenWithAmount, isTxResultError } from "types/tx";
import { isTooltip, useAdminContext } from "pages/Admin/Context";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { humanize } from "helpers";
import { sendEVMTx } from "helpers/tx/sendTx/sendEVMTx";
import { appRoutes } from "constants/routes";
import {
  EstimateErrror,
  InvestEstimate,
  estimateInvest,
} from "./estimateInvest";

type EstimateStatus = InvestEstimate | "loading" | EstimateErrror;

const estimateIsError = (
  estimate: EstimateStatus
): estimate is { error: string } =>
  typeof estimate === "object" && "error" in estimate;

export default function Summary(props: SummaryProps) {
  const { showModal } = useModalContext();

  const [estimate, setEstimate] = useState<EstimateStatus>("loading");
  const { txResource, multisig, id } = useAdminContext([
    props.type === "liquid"
      ? "liquidInvestmentManagement"
      : "lockedInvestmentManagement",
  ]);

  useEffect(() => {
    (async () => {
      setEstimate("loading");
      if (isTooltip(txResource)) {
        return setEstimate({ error: txResource });
      }

      const { wallet } = txResource;
      const _estimate = await estimateInvest(id, multisig, wallet, props);
      setEstimate(_estimate);
    })();
  }, [props, txResource, id, multisig]);

  function goBack() {}

  async function submit({ tx }: InvestEstimate) {
    try {
      if (isTooltip(txResource)) throw new Error(txResource);
      const { txMeta, wallet } = txResource;

      showModal(TxPrompt, { loading: "Investing..." });
      const result = await sendEVMTx(wallet, tx);

      if (isTxResultError(result)) {
        return showModal(TxPrompt, { error: result.error });
      }
      showModal(TxPrompt, { success: txMeta.successMeta });
    } catch (err) {
      return showModal(TxPrompt, { error: "Failed to invest assets" });
    }
  }

  const { token } = props;
  const isNotEstimated = estimateIsError(estimate) || estimate === "loading";

  return (
    <div className="grid content-start">
      <Row title="Name">
        <span>{props.name}</span>
      </Row>
      <Row title="Account">
        <span className="capitalize">{props.type}</span>
      </Row>
      <Row title="Risk Rating">
        <span>{props.rating}</span>
      </Row>
      <Row title="APR">
        <span>{props.apy}</span>
      </Row>
      <Breakdown estimate={estimate} token={token} />
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
          disabled={isNotEstimated || estimate.noProceedsLeft}
          type="submit"
        >
          Invest
        </button>
        <Link
          to={appRoutes.marketplace + `/${id}`}
          className="col-span-full btn-outline btn-donate"
        >
          Back
        </Link>
      </div>
    </div>
  );
}

function Breakdown({
  estimate,
  token,
}: {
  estimate: EstimateStatus;
  token: TokenWithAmount;
}) {
  if (estimateIsError(estimate)) {
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
        <ErrorStatus classes="my-3 justify-self-center"></ErrorStatus>
      </>
    );
  }

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

  return (
    <>
      {estimate.items
        .filter((i) => i.amount === 0)
        .map(({ name, amount, prettyAmount }, i) => (
          <Row key={i} title={name}>
            <span className={amount < 0 ? "text-red dark:text-red-l2" : ""}>
              {prettyAmount}
            </span>
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
