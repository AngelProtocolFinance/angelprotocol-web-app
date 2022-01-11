import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "contracts/types";
import { useProfilesQuery } from "services/aws/endowments/endowments";
import { profile as profile_placeholder } from "services/aws/endowments/placeholders";

export default function useProfile(address: string) {
  const wallet = useConnectedWallet();
  const is_test = wallet?.network.chainID === chainIDs.testnet;
  const { profile = profile_placeholder } = useProfilesQuery(is_test, {
    selectFromResult: ({ data }) => {
      return {
        profile: data?.find((profile) => profile.endowment_address === address),
      };
    },
  });
  return profile;
}
