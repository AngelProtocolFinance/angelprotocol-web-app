import { denoms } from "constants/currency";
import Portion from "./Portion";
import Currency from "./Currency";
import Slider from "./Slider";
import Amount from "./Amount";
import useTerraSender from "./useTerraSender";
import { useFormContext } from "react-hook-form";

export default function DonateForm() {
  const { formState } = useFormContext();
  const handleSubmit = useTerraSender();
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white grid p-4 rounded-md"
      autoComplete="off"
    >
      <Amount />
      <div className="flex gap-2 mb-3">
        <Currency currency={denoms.uusd} />
        <Currency currency={denoms.ether} />
        <Currency currency={denoms.btc} />
      </div>
      <p className="text-angel-grey uppercase font-bold my-2">Split</p>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <Portion type="liquid" />
        <Portion type="locked">
          <Slider />
        </Portion>
      </div>
      <button
        disabled={formState.isSubmitting}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-b-md rounded-t-sm mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        submit
      </button>
    </form>
  );
}
