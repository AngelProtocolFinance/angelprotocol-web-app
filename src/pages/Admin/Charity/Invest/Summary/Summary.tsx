import { PropsWithChildren, useEffect, useState } from "react";
import { SummaryProps } from "../types";
import { TokenWithAmount, isTxResultError } from "types/tx";
import { isTooltip, useAdminContext } from "pages/Admin/Context";
import { useModalContext } from "contexts/ModalContext";
import Modal from "components/Modal";
import { TxPrompt } from "components/Prompt";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { humanize } from "helpers";
import { sendEVMTx } from "helpers/tx/sendTx/sendEVMTx";
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
  const { showModal, setModalOption } = useModalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimate, setEstimate] = useState<EstimateStatus>("loading");
  const { txResource, multisig, id } = useAdminContext([
    props.type === "liquid"
      ? "liquidInvestmentManagement"
      : "lockedInvestmentManagement",
  ]);

  useEffect(() => {
    (async () => {
      if (isTooltip(txResource)) {
        return setEstimate({ error: txResource });
      }
      setEstimate("loading");
      const { wallet } = txResource;
      const _estimate = await estimateInvest(id, multisig, wallet, props);
      setEstimate(_estimate);
    })();
  }, [props]);

  function goBack() {}

  async function submit({ tx }: InvestEstimate) {
    try {
      if (isTooltip(txResource)) throw new Error(txResource);
      const { txMeta, wallet } = txResource;

      setIsSubmitting(true);
      //prevent closing this modal while this fn is still running
      setModalOption("isDismissible", false);
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
    <Modal
      as="div"
      className="grid content-start max-h-[95vh] overflow-y-auto max-w-[37.5rem] w-[95vw] sm:w-full fixed-center z-20 bg-gray-l6 dark:bg-blue-d6 border border-prim rounded"
    >
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
          disabled={isSubmitting}
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
          disabled={isSubmitting || isNotEstimated || estimate.noProceedsLeft}
          type="submit"
        >
          Invest
        </button>
      </div>
    </Modal>
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
        <ErrorStatus classes="my-3 justify-self-center">
          {estimate.error}
        </ErrorStatus>
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
