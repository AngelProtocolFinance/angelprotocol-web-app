import { CgArrowsExchangeAltV } from "react-icons/cg";
import { Fee, Commission, SwapRate } from "./Misc";
import Status from "../Status";
import Output from "./Output";
import Amount from "./Amount";
import useSwap from "./useSwap";

export default function SwapForm() {
  const { swap, isFormLoading, isSubmitDisabled, switchCurrency } = useSwap();
  return (
    <form
      onSubmit={swap}
      className="bg-white-grey grid p-4 rounded-md w-full"
      autoComplete="off"
    >
      <Status />
      <Amount />
      <button
        type="button"
        className="text-blue-accent active:text-angel-blue hover:text-angel-blue justify-self-center my-3"
        onClick={switchCurrency}
      >
        <CgArrowsExchangeAltV className="text-3xl" />
      </button>
      <Output />
      <SwapRate />
      <Fee />
      <Commission />
      <button
        disabled={isSubmitDisabled}
        className="bg-angel-orange disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {isFormLoading ? "simulating.." : "swap"}
      </button>
    </form>
  );
}
