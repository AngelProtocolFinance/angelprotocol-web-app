import tokens from "@better-giving/assets/tokens/map";
import { PayQr } from "components/donation";
import { Modal } from "components/modal";
import PromptV2, { type IPromptV2 } from "components/prompt";
import { roundDown } from "helpers";
import { errorPrompt } from "helpers/error-prompt";
import { useState } from "react";
import { toast } from "sonner";
import type { Payment } from "types/crypto";

interface IQrModal extends Payment {
  orderAmount: number;
  onClose: () => void;
}
interface Props {
  paymentId: number | string;
  classes?: string;
  amount: number;
}
export default function PaymentResumer({ paymentId, classes, amount }: Props) {
  const [intentState, setIntentState] = useState<"pending">();
  const [qr, setQr] = useState<IQrModal>();
  const [prompt, setPrompt] = useState<IPromptV2>();

  return (
    <button
      disabled={intentState === "pending"}
      type="button"
      className={`${classes} btn btn-blue px-3 py-1 text-xs`}
      onClick={async () => {
        try {
          setIntentState("pending");
          const res = await fetch(`/api/crypto-intents/${paymentId}`);
          if (res.status === 410) {
            return toast.error("Donation is already processing.");
          }
          const payment: Payment = await res.json();
          setQr({
            ...payment,
            orderAmount: amount,
            onClose: () => setQr(undefined),
          });
        } catch (err) {
          setQr(undefined);
          setPrompt(errorPrompt(err));
        } finally {
          setIntentState(undefined);
        }
      }}
    >
      {intentState === "pending" ? "Loading..." : "Finish paying"}
      {qr && <QrModal {...qr} onClose={() => setQr(undefined)} />}
      {prompt && <PromptV2 {...prompt} onClose={() => setPrompt(undefined)} />}
    </button>
  );
}

function QrModal(props: IQrModal) {
  const token = tokens[props.currency];
  return (
    <Modal
      open={true}
      onClose={props.onClose ?? (() => {})}
      classes="fixed-center z-10 grid text-gray-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-sm overflow-hidden px-4 py-8"
    >
      <h4 className="text-lg text-center mb-2">
        Donation to {props.description}
      </h4>

      <p className="text-gray text-balance text-center mb-3.5 max-w-sm justify-self-center">
        To complete your donation, send{" "}
        {roundDown(props.orderAmount, token.precision)}
        &nbsp;
        {token.symbol} from your crypto wallet to the address below
      </p>

      <PayQr
        token={token}
        recipient={props.address}
        extraId={props.extra_address ?? null}
      />
    </Modal>
  );
}
