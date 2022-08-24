import Fee from "../Fee";
import Status from "../Status";
import Claims from "./Claims";
import useClaimUnstakedHalo from "./useClaimUnstakedHalo";

export default function Claimer() {
  const { claimUnstakedHalo } = useClaimUnstakedHalo();

  return (
    <div className="bg-white-grey grid p-4 rounded-md w-full">
      <Status />
      <Claims />
      <Fee />
      <button
        onClick={claimUnstakedHalo}
        className="bg-angel-orange disabled:bg-grey-accent p-2 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        Claim
      </button>
    </div>
  );
}

/**
 * TODO:// handle this checks on top level
 * 
 *  if ((gov_staker?.claims || []).length <= 0) {
          dispatch(setFormError("No recent unstaked tokens"));
          return;
        }

        const hasClaim = !!gov_staker.claims?.find(
          (claim) => +claim.release_at.at_time <= Date.now() * 1e6
        );

        if (!hasClaim) {
          dispatch(setFormError("No claimable tokens at the moment"));
          return;
        }
 */
