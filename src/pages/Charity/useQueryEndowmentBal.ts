import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "contracts/types";
import { useLeaderboardsQuery } from "services/aws/leaderboard/leaderboard";
import { update } from "services/aws/leaderboard/placeholders";
import { Endowment } from "services/aws/leaderboard/types";

export default function useQueryEndowmentBal(
  endowmentAddress: string,
  placeholder?: boolean
): Endowment {
  const wallet = useConnectedWallet();
  const is_test = wallet?.network.chainID === chainIDs.testnet;
  const { data = update } = useLeaderboardsQuery(is_test);

  const balance = data.endowments.find((x) => x.address === endowmentAddress);
  const placeholderBalance = {
    address: endowmentAddress,
    chain: is_test ? "testnet" : "mainnet",
    total_liq: 0,
    total_lock: 0,
    overall: 0,
  } as Endowment;
  return !placeholder && balance ? balance : placeholderBalance;
}
