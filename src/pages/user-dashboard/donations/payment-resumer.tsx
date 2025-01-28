import tokens from "@better-giving/assets/tokens/map";
import { ap, ver } from "api/api";
import { PayQr } from "components/donation";
import { Modal } from "components/modal";
import PromptV2, { type IPromptV2 } from "components/prompt";
import { roundDown } from "helpers";
import { errorPrompt } from "helpers/error-prompt";
import { useState } from "react";
import { toast } from "sonner";
import type { Crypto } from "types/aws";

interface IQrModal extends Crypto.PaymentStatus {
  orderAmount: number;
}
interface Props {
  paymentId: number;
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
      className={`${classes} btn-blue px-3 py-1 text-xs`}
      onClick={async () => {
        try {
          setIntentState("pending");
          const payment = await ap
            .get<Crypto.PaymentStatus>(
              `${ver(1)}/crypto/v1/payment/${paymentId}`
            )
            .json();
          if (payment.payment_status !== "waiting") {
            return toast.error("Donation is already processing.");
          }
          setQr({ ...payment, orderAmount: amount });
        } catch (err) {
          setQr(undefined);
          setPrompt(errorPrompt(err));
        } finally {
          setIntentState(undefined);
        }
      }}
    >
      {intentState === "pending" ? "Loading..." : "Finish paying"}
      {qr && <QrModal {...qr} />}
      {prompt && <PromptV2 {...prompt} onClose={() => setPrompt(undefined)} />}
    </button>
  );
}

function QrModal(props: IQrModal) {
  const token = tokens[props.pay_currency.toUpperCase()];
  return (
    <Modal
      open={true}
      onClose={() => {}}
      classes="fixed-center z-10 grid text-gray-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-sm overflow-hidden px-4 py-8"
    >
      <h4 className="text-lg text-center mb-2">{props.order_description}</h4>

      <p className="text-gray text-balance text-center mb-3.5 max-w-sm justify-self-center">
        To complete your donation, send{" "}
        {roundDown(props.orderAmount, token.precision)}
        &nbsp;
        {token.code} from your crypto wallet to the address below
      </p>

      <PayQr
        amount={roundDown(props.pay_amount, token.precision)}
        token={token}
        recipient={props.pay_address}
        extraId={props.payin_extra_id}
      />
    </Modal>
  );
}
