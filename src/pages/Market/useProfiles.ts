import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "contracts/types";
import { useProfilesQuery } from "services/aws/endowments/endowments";

export default function useProfiles(fund_id: number) {
  const wallet = useConnectedWallet();
  const is_test = wallet?.network.chainID === chainIDs.testnet;
  const { profiles = [] } = useProfilesQuery(is_test, {
    selectFromResult: ({ data }) => ({
      profiles: data?.filter((profile) => profile.un_sdg === `${fund_id}`),
    }),
  });

  return profiles;
}
