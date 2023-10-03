import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { EndowmentType } from "types/lists";
import { useStripeSessionURLMutation } from "services/apes";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import Modal from "components/Modal";
import Split from "components/Split";

type Props = {
  endowId: number;
  endowType: EndowmentType;
};

type FV = {
  pctLiquidSplit: number; // <input range value transformed to number via onChange
};

export default function SplitModal({ endowType, endowId }: Props) {
  const { setModalOption, closeModal } = useModalContext();
  const { handleError } = useErrorContext();
  const [sessionURLFn, { isLoading }] = useStripeSessionURLMutation();
  //additional state to keep button disabled while redirecting
  const [isRedirecting, setIsRedirecting] = useState(false);

  const methods = useForm<FV>({
    defaultValues: { pctLiquidSplit: 50 },
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Modal
        as="form"
        onSubmit={handleSubmit(async (fv) => {
          try {
            //prevent close modal while async fn is running
            setModalOption("isDismissible", false);

            const session = await sessionURLFn({
              endowId,
              endowType,
              liquidSplitPct: fv.pctLiquidSplit.toString(),
            }).unwrap();

            setIsRedirecting(true);
            window.location.href = session.url;
          } catch (err) {
            console.error(err);
            setModalOption("isDismissible", true);
            setIsRedirecting(false);
            closeModal();
            handleError("Failed to load payment platform");
          }
        })}
        className="grid p-6 max-h-[95vh] overflow-y-auto max-w-[37.5rem] w-[95vw] sm:w-full fixed-center z-20 bg-gray-l6 dark:bg-blue-d6 border border-prim rounded"
      >
        <label className="mb-2 font-heading font-bold uppercase">
          Donation split
        </label>
        <Split<FV, "pctLiquidSplit">
          className="mb-6"
          liqPctField="pctLiquidSplit"
        />
        <button
          disabled={isLoading || isRedirecting}
          type="submit"
          className="justify-self-end text-sm min-w-[8rem] py-2 btn-orange disabled:bg-gray-l1"
        >
          {isLoading
            ? "Loading platform..."
            : isRedirecting
            ? "Redirecting..."
            : "Proceed to payment"}
        </button>
      </Modal>
    </FormProvider>
  );
}
