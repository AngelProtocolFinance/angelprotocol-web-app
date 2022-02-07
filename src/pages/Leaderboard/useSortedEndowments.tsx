import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import { useMemo } from "react";
import { useEndowmentsQuery } from "services/aws/endowments/endowments";
import { MergedEndowment } from "services/aws/endowments/types";
import { useLeaderboardsQuery } from "services/aws/leaderboard/leaderboard";
import {
  placeholderUpdate as leaderboard_update,
  endowment as endowmentWithBalPlaceholder,
} from "services/aws/leaderboard/placeholders";

export default function useSortedEndowments() {
  const wallet = useConnectedWallet();
  const is_test = wallet?.network.chainID === chainIDs.testnet;

  const { data: update = leaderboard_update, isLoading: isLoadingBoard } =
    useLeaderboardsQuery(is_test);
  const { data: endowments = [], isLoading } = useEndowmentsQuery(is_test);

  const sortedMergedEndowments: MergedEndowment[] = useMemo(() => {
    if (update.endowments.length === 0) return [];

    return endowments
      .map((endowment) => {
        const endowmentWithBalance =
          update.endowments.find(
            (endowmentWithBalance) =>
              endowmentWithBalance.address === endowment.address
          ) || endowmentWithBalPlaceholder;

        const { total_lock, total_liq, overall } = endowmentWithBalance;
        return { ...endowment, total_liq, total_lock, overall };
      })
      .sort((prev, curr) => curr.overall - prev.overall);
  }, [endowments, update.endowments]);

  return {
    isLoading: isLoading || isLoadingBoard,
    last_update: update.last_update,
    data: sortedMergedEndowments,
  };
}
