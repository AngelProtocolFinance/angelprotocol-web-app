import Icon from "components/Icon";
import Status from "../Status";
import Amount from "./Amount";
import { Commission, Fee, SwapRate } from "./Misc";
import Output from "./Output";
import useSwap from "./useSwap";

export default function SwapForm() {
  const { swap, isFormLoading, isSubmitDisabled, switchCurrency } = useSwap();
  return (
    <form
      onSubmit={swap}
      className="bg-white grid p-4 rounded-md w-full"
      autoComplete="off"
    >
      <Status />
      <Amount />
      <button
        type="button"
        className="text-blue-d1 active:text-blue hover:text-blue justify-self-center my-3"
        onClick={switchCurrency}
      >
        <Icon type="ExchangeAlt" className="text-3xl" />
      </button>
      <Output />
      <SwapRate />
      <Fee />
      <Commission />
      <button
        disabled={isSubmitDisabled}
        className="bg-orange disabled:bg-gray p-2 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {isFormLoading ? "simulating.." : "swap"}
      </button>
    </form>
  );
}
