import TableView from "./TableView";
import { placeholderUpdate as leaderboard_update } from "services/aws/leaderboard/placeholders";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "contracts/types";
import { useLeaderboardsQuery } from "services/aws/leaderboard/leaderboard";
import { useEndowmentsQuery } from "services/aws/endowments/endowments";
import Loader from "components/Loader/Loader";
import { useMemo } from "react";
import projectFunds from "./projectFunds";
import { MergeEndowment } from "services/aws/endowments/types";

export default function Board() {
  const wallet = useConnectedWallet();
  const is_test = wallet?.network.chainID === chainIDs.testnet;
  const { data: update = leaderboard_update } = useLeaderboardsQuery(is_test);
  const { data: endowments = [], isLoading } = useEndowmentsQuery(is_test);

  const sortedEndowments = useMemo(() => {
    if (update.endowments.length === 0) return [];
    const data = endowments
      .map((end) => {
        const details = update.endowments.find(
          (a) => a.address === end.address
        );
        return { ...end, ...details };
      })
      .sort((val1, val2) => {
        const v1 = projectFunds(
          10,
          val1?.total_lock || 0,
          val1?.total_liq || 0,
          20,
          15
        );
        const v2 = projectFunds(
          10,
          val2?.total_lock || 0,
          val2?.total_liq || 0,
          20,
          15
        );
        return v2.liquid + v2.locked - (v1.liquid + v1.locked);
      });
    return data as MergeEndowment[];
  }, [endowments, update.endowments]);

  return (
    <div className="relative min-h-leader-table p-6 pt-10 my-5 mt-2 grid place-items-center overflow-hidden bg-white rounded-xl shadow-lg">
      <p className="flex absolute top-3 right-6 gap-2 text-sm font-body text-angel-grey text-opacity-80 italic">
        last updated:{" "}
        {new Date(update.last_update).toLocaleString([], {
          dateStyle: "short",
          timeStyle: "short",
          hour12: false,
        })}
      </p>
      {isLoading && (
        <div className="h-40 bg-white bg-opacity-5 rounded-lg grid place-items-center">
          <Loader
            bgColorClass="bg-white-grey bg-opacity-80"
            gapClass="gap-2"
            widthClass="w-4"
          />
        </div>
      )}
      {!isLoading && <TableView endowments={sortedEndowments} />}
    </div>
  );
}
