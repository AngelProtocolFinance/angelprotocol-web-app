import tokens from "@better-giving/assets/tokens/map";
import { ap, ver } from "api/api";
import Modal from "components/Modal";
import { PayQr } from "components/donation";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { roundDown } from "helpers";
import { useState } from "react";
import type { Crypto } from "types/aws";

type Props = { paymentId: number; classes?: string; amount: number };
export default function PaymentResumer({ paymentId, classes, amount }: Props) {
  const { handleError, displayError } = useErrorContext();
  const { showModal } = useModalContext();

  const [intentState, setIntentState] = useState<"pending">();

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
            return displayError("Donation is already processing.");
          }
          showModal(QrModal, { ...payment, orderAmount: amount });
        } catch (err) {
          handleError(err, "parsed");
        } finally {
          setIntentState(undefined);
        }
      }}
    >
      {intentState === "pending" ? "Loading..." : "Finish paying"}
    </button>
  );
}

function QrModal(props: Crypto.PaymentStatus & { orderAmount: number }) {
  const token = tokens[props.pay_currency.toUpperCase()];
  return (
    <Modal className="fixed-center z-10 grid text-navy-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden px-4 py-8">
      <h4 className="text-lg text-center mb-2">{props.order_description}</h4>

      <p className="text-navy-l1 text-balance text-center mb-3.5 max-w-sm justify-self-center">
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
