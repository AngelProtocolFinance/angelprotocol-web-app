import { useFormContext } from "react-hook-form";
import { Values } from "./types";
import { setFee, setStage } from "services/transaction/transactionSlice";
import { useGetter, useSetter } from "store/accessors";
import { Step } from "services/transaction/types";
import useWithdrawHoldings from "./useWithdrawHoldings";
import Status from "./Status";
import Amount from "./Amount";
import { useSetModal } from "components/Nodal/Nodal";

export default function WithdrawForm() {
  const { hideModal } = useSetModal();
  const dispatch = useSetter();
  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<Values>();
  const handleWithdrawHoldings = useWithdrawHoldings();
  const { form_loading, form_error } = useGetter((state) => state.transaction);

  const address = watch("receiver")?.toString();
  if (!address) {
    dispatch(
      setStage({
        step: Step.error,
        content: { message: "Address is empty" },
      })
    );
  }

  const closeModal = () => {
    dispatch(setFee(0));
    hideModal();
  };

  return (
    <div className="p-3 md:p-6 bg-white-grey w-full min-h-115 rounded-xl shadow-lg overflow-hidden relative">
      <h3 className="mb-1 text-lg text-angel-grey text-center font-semibold font-heading">
        Withdraw from Accounts
      </h3>
      <p className="mb-3 md:mb-6 text-angel-grey text-center text-xs">
        Enter the quantity of tokens to withdraw from each of the active Liquid
        Account's current strategies.
      </p>
      <div className="text-angel-grey">
        <form
          onSubmit={handleSubmit(handleWithdrawHoldings)}
          autoComplete="off"
        >
          <Status />
          <Amount />
          <div className="flex flex-row mt-6">
            <button
              type="submit"
              className="m-auto uppercase hover:bg-blue-accent bg-angel-blue rounded-lg w-28 h-8 text-white-grey text-sm font-bold disabled:bg-grey-accent"
              disabled={isSubmitting || form_loading || !!form_error}
            >
              {form_loading ? "Estimating..." : "Withdraw"}
            </button>
            <button
              className="m-auto uppercase hover:bg-angel-orange hover:text-white-grey hover:border-opacity-0 rounded-lg w-28 h-8 text-angel-orange border-2 border-angel-orange text-sm font-bold"
              disabled={isSubmitting || form_loading || !!form_error}
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
