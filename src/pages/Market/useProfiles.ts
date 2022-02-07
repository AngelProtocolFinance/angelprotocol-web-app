import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import { useProfilesQuery } from "services/aws/endowments/endowments";

export default function useProfiles(fund_id: number) {
  const wallet = useConnectedWallet();
  const isTest = wallet?.network.chainID === chainIDs.testnet;

  const { profiles = [] } = useProfilesQuery(isTest, {
    selectFromResult: ({ data }) => ({
      profiles: data?.filter((profile) => profile.un_sdg === `${fund_id}`),
    }),
  });

  return profiles;
}
