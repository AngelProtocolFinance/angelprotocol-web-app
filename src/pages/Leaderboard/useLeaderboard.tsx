import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "contracts/types";
import { useLeaderboardsQuery } from "services/aws/leaderboard/leaderboard";
import { Endowment } from "services/aws/leaderboard/types";

const placeholder: Endowment = {
  address: "",
  total_liq: 0,
  total_lock: 0,
  overall: 0,
  chain: "testnet",
};

export default function useLeaderboard(address: string) {
  const wallet = useConnectedWallet();
  const isTest = wallet?.network.chainID === chainIDs.testnet;
  const { details = placeholder } = useLeaderboardsQuery(isTest, {
    selectFromResult: ({ data }) => ({
      details: data?.endowments.find((profile) => profile.address === address),
    }),
  });
  return details;
}
