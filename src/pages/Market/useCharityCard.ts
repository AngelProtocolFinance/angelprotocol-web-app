import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import { useProfilesQuery } from "services/aws/endowments/endowments";
import { profile as profile_placeholder } from "services/aws/endowments/placeholders";

//in displaying marketplace card info, just reuse useProfilesQuery result
//to avoid each card calling separate API call
export default function useCharityCard(address: string) {
  const wallet = useConnectedWallet();
  const isTest = wallet?.network.chainID === chainIDs.testnet;

  const { profile = profile_placeholder } = useProfilesQuery(isTest, {
    selectFromResult: ({ data }) => ({
      profile: data?.find((profile) => profile.endowment_address === address),
    }),
  });
  return profile;
}
