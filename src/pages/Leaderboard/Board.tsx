import { ChainIDs } from "@types-lists";
import {
  placeholderUpdate as leaderboard_update,
  useLeaderboardsQuery,
} from "services/aws/leaderboard";
import Loader from "components/Loader/Loader";
import useWalletContext from "hooks/useWalletContext";
import TableView from "./TableView";

export default function Board() {
  const { wallet } = useWalletContext();
  const is_test = (wallet?.network.chainID as ChainIDs) === "bombay-12";
  const { data: update = leaderboard_update, isLoading } =
    useLeaderboardsQuery(is_test);
  return (
    <div className="relative min-h-leader-table p-6 pt-10 my-5 mt-2 grid place-items-center overflow-hidden bg-white rounded-xl shadow-lg">
      <p className="flex absolute top-3 right-6 gap-2 text-sm font-body text-angel-grey/80 italic">
        last updated:{" "}
        {new Date(update.last_update).toLocaleString([], {
          dateStyle: "short",
          timeStyle: "short",
          hour12: false,
        })}
      </p>
      {isLoading && (
        <div className="h-40 bg-white/5 rounded-lg grid place-items-center">
          <Loader
            bgColorClass="bg-white-grey/80"
            gapClass="gap-2"
            widthClass="w-4"
          />
        </div>
      )}
      {!isLoading && <TableView endowments={update.endowments} />}
    </div>
  );
}
