import { useGetter } from "store/accessors";
import Status from "../Status";
import Fee from "../Fee";
import Claims from "./Claims";
import useClaimUnstakedHalo from "./useClaimUnstakedHalo";

export default function ClaimForm() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const { claimUnstakedHalo } = useClaimUnstakedHalo();

  return (
    <div className="bg-white-grey grid p-4 rounded-md w-full">
      <Status />
      <Claims />
      <Fee />
      <button
        onClick={claimUnstakedHalo}
        disabled={form_loading || !!form_error}
        className="bg-angel-orange disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {form_loading ? "estimating fee.." : "claim"}
      </button>
    </div>
  );
}
