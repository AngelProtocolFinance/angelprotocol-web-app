import TableView from "./TableView";
import { update as leaderboard_update } from "services/aws/leaderboard/placeholders";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "contracts/types";
import { useLeaderboardsQuery } from "services/aws/leaderboard/leaderboard";

export default function Board() {
  const wallet = useConnectedWallet();
  const is_test = wallet?.network.chainID === chainIDs.testnet;
  const { data: update = leaderboard_update } = useLeaderboardsQuery(is_test);

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
      <TableView {...update} />
    </div>
  );
}
