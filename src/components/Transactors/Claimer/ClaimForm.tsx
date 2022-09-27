import Fee from "../Fee";
import Status from "../Status";
import Claims from "./Claims";
import useClaimUnstakedHalo from "./useClaimUnstakedHalo";

export default function ClaimForm() {
  const { claimUnstakedHalo, isSubmitDisabled, isFormLoading } =
    useClaimUnstakedHalo();

  return (
    <div className="bg-white grid p-4 rounded-md w-full">
      <Status />
      <Claims />
      <Fee />
      <button
        onClick={claimUnstakedHalo}
        disabled={isSubmitDisabled}
        className="bg-orange disabled:bg-gray p-2 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {isFormLoading ? "estimating fee.." : "claim"}
      </button>
    </div>
  );
}
