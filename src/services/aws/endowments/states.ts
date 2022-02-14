import { useConnectedWallet } from "@terra-money/use-wallet";
import { chainIDs } from "constants/chainIDs";
import { endowments_api } from "./endowments";
import { profile } from "./placeholders";

export function useProfileState(charity_addr: string) {
  const {
    data = profile,
    isLoading,
    isFetching,
  } = endowments_api.endpoints.profile.useQueryState(charity_addr);

  return { profileState: data, isProfileLoading: isLoading || isFetching };
}

export default function useProfilesState(fund_id: number) {
  const wallet = useConnectedWallet();
  const isTest = wallet?.network.chainID === chainIDs.testnet;
  const {
    data = [],
    isFetching,
    isLoading,
  } = endowments_api.endpoints.profiles.useQueryState(isTest);
  return {
    profilesState: data.filter(
      (profile) =>
        profile.tier !== 1 &&
        (fund_id ? profile.un_sdg === `${fund_id || 0}` : true)
    ),
    isProfilesLoading: isFetching || isLoading,
  };
}
