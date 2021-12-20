import { useFormContext } from "react-hook-form";
import { useGetter } from "store/accessors";
import Amount from "./Amount";
import { Fee, Commission, Effect } from "./Misc";
import Output from "./Output";
import Status from "./Status";
import { Values } from "./types";
import useSwapper from "./useSwapper";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import useSaleStatus from "./useSaleStatus";
export default function SwapForm() {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<Values>();
  const swap = useSwapper();

  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const { is_live, message } = useSaleStatus();
  const is_buy = watch("is_buy");

  function switch_currency() {
    setValue("is_buy", !is_buy);
  }

  return (
    <form
      onSubmit={handleSubmit(swap)}
      className="bg-white grid p-4 rounded-md w-full"
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
      <Fee />
      <Commission />
      <Effect />
      {(is_live && (
        <button
          disabled={isSubmitting || form_loading || !!form_error}
          className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-md text-white font-bold"
          type="submit"
        >
          {form_loading ? "simulating.." : "swap"}
        </button>
      )) || (
        <button
          disabled={!is_live}
          className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-md text-white font-bold"
          type="submit"
        >
          {message}
        </button>
      )}
      <p className="text-angel-grey text-2xs justify-self-center pt-3 p-2">
        By clicking this button and participating in the HaloSwap, you
        acknowledge that you've read and accept the HaloSwap{" "}
        <a
          className="text-angel-blue"
          target="_blank"
          href="https://drive.google.com/file/d/19R5CiaZny7UYAIKNlRc4ssvqJDhETzKk/view?usp=sharing"
          rel="noreferrer"
        >
          Terms & Conditions
        </a>
      </p>
    </form>
  );
}
