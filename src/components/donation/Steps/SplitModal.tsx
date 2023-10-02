import { FormProvider, useForm } from "react-hook-form";
import { EndowmentType } from "types/lists";
import { useStripeSessionURLMutation } from "services/apes";
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
  const { setModalOption } = useModalContext();
  const [sessionURLFn, { isLoading }] = useStripeSessionURLMutation();

  const methods = useForm<FV>({
    defaultValues: { pctLiquidSplit: 50 },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <Modal
        as="form"
        onSubmit={handleSubmit(async (fv) => {
          //prevent close modal while async fn is running
          setModalOption("isDismissible", false);
          const session = await sessionURLFn({
            endowId,
            endowType,
            liquidSplitPct: fv.pctLiquidSplit.toString(),
          }).unwrap();

          console.log({ session });
        })}
        className="max-h-[95vh] overflow-y-auto max-w-[37.5rem] w-[95vw] sm:w-full fixed-center z-20 bg-gray-l6 dark:bg-blue-d6 border border-prim rounded"
      >
        <Split<FV, "pctLiquidSplit">
          className="mb-6"
          liqPctField="pctLiquidSplit"
        />
        <button
          disabled={isSubmitting || isLoading}
          type="submit"
          className="text-sm min-w-[8rem] py-2 btn-orange disabled:bg-gray-l1"
        >
          Continue
        </button>
      </Modal>
    </FormProvider>
  );
}
