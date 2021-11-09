import { denoms } from "constants/currency";
// import Portion from "./Portion";
import Currency from "./Currency";
// import Slider from "./Slider";
import Amount from "./Amount";
import useSubmit from "./useSubmit";
import Breakdown from "./Breakdown";
import Status from "./Status";
import { useFormContext } from "react-hook-form";
import { Values } from "components/Donater/types";

export default function DonateForm() {
  const { watch } = useFormContext<Values>();
  const { submitHandler, isSubmitting } = useSubmit();
  const loading = watch("loading");
  const error = watch("form_error");
  return (
    <form
      onSubmit={submitHandler}
      className="bg-white grid p-4 rounded-md"
      autoComplete="off"
    >
      <Status />
      <Amount />
      <div className="flex gap-2 mb-3">
        <Currency currency={denoms.uusd} />
        <Currency currency={denoms.ether} />
        <Currency currency={denoms.btc} />
      </div>
      <Breakdown />
      {/* <p className="text-angel-grey uppercase font-bold mb-2 mt-4">Split</p>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <Portion
          type="liquid"
          border_class="border-angel-blue"
          text_class="text-blue-accent"
          title="Readily available"
        />
        <Portion
          type="locked"
          border_class="border-green-400"
          text_class="text-green-400"
          title="Compunded Forever"
        >
          <Slider />
        </Portion>
      </div> */}
      <button
        disabled={isSubmitting || loading || !!error}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {loading ? "estimating fee.." : "submit"}
      </button>
    </form>
  );
}
