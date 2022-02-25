import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { useGetter, useSetter } from "store/accessors";
import { swap } from "services/transaction/transactors/swap";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import { Fee, Commission, SwapRate } from "./Misc";
import useSwapEstimator from "./useSwapEstimator";
import { SwapValues } from "./types";
import Output from "./Output";
import Status from "./Status";
import Amount from "./Amount";

export default function SwapForm() {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useFormContext<SwapValues>();

  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const { tx, wallet } = useSwapEstimator();
  const { showModal } = useSetModal();

  const dispatch = useSetter();
  const _swap = useCallback(
    (data: SwapValues) => {
      dispatch(swap({ wallet, tx: tx!, swapValues: data }));
      showModal(TransactionPrompt, {});
    },
    //eslint-disable-next-line
    [tx, wallet]
  );

  const is_buy = watch("is_buy");
  function switch_currency() {
    setValue("is_buy", !is_buy);
  }

  return (
    <form
      onSubmit={handleSubmit(_swap)}
      className="bg-white-grey grid p-4 rounded-md w-full"
      autoComplete="off"
    >
      <Status />
      <Amount />
      <button
        type="button"
        className="text-blue-accent active:text-angel-blue hover:text-angel-blue justify-self-center my-3"
        onClick={switch_currency}
      >
        <CgArrowsExchangeAltV className="text-3xl" />
      </button>
      <Output />
      <SwapRate />
      <Fee />
      <Commission />
      <button
        disabled={form_loading || !!form_error || !isValid || !isDirty}
        className="bg-angel-orange disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {form_loading ? "simulating.." : "swap"}
      </button>
    </form>
  );
}
