import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "contracts/types";
import { useMemo } from "react";
import { useEndowmentsQuery } from "services/aws/endowments/endowments";
import { MergeEndowment } from "services/aws/endowments/types";
import { useLeaderboardsQuery } from "services/aws/leaderboard/leaderboard";
import { placeholderUpdate as leaderboard_update } from "services/aws/leaderboard/placeholders";
import projectFunds from "./projectFunds";

export default function useSortedEndowments() {
  const wallet = useConnectedWallet();
  const is_test = wallet?.network.chainID === chainIDs.testnet;

  const { data: update = leaderboard_update, isLoading: isLoadingBoard } =
    useLeaderboardsQuery(is_test);
  const { data: endowments = [], isLoading } = useEndowmentsQuery(is_test);

  const sortedEndowments = useMemo(() => {
    if (update.endowments.length === 0) return [];

    const data = endowments
      .map((end) => {
        const details = update.endowments.find(
          (a) => a.address === end.address
        );
        const { liquid, locked } = projectFunds(
          10,
          details?.total_lock || 0,
          details?.total_liq || 0,
          20,
          15
        );
        return { ...end, ...details, liquid, locked };
      })
      .sort((a, b) => b.liquid + b.locked - (a.liquid + a.locked));
    return data as MergeEndowment[];
  }, [endowments, update.endowments]);

  return {
    isLoading: isLoading || isLoadingBoard,
    last_update: update.last_update,
    data: sortedEndowments,
  };
}
