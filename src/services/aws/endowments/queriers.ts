import { useConnectedWallet } from "@terra-money/use-wallet";
import { chainIDs } from "constants/chainIDs";
import { endowments_api } from "./endowments";
import { profile } from "./placeholders";

export function useProfile(charity_addr: string) {
  const { useProfileQuery } = endowments_api;
  const {
    data = profile,
    isLoading,
    isFetching,
    isError,
  } = useProfileQuery(charity_addr);

  return {
    profile: data,
    isProfileLoading: isLoading || isFetching,
    isProfileError: isError,
  };
}

export function useCategorizedProfiles() {
  const { useUseCategorizedProfilesQuery } = endowments_api;
  const wallet = useConnectedWallet();
  const isTest = wallet?.network.chainID === chainIDs.testnet;
  const {
    data = {},
    isLoading,
    isFetching,
  } = useUseCategorizedProfilesQuery(isTest);
  return {
    categorizedProfiles: data,
    isProfilesLoading: isFetching || isLoading,
  };
}

export function useFundProfiles(fund_id: number) {
  const { useProfilesQuery } = endowments_api;
  const wallet = useConnectedWallet();
  const isTest = wallet?.network.chainID === chainIDs.testnet;

  const { profiles = [] } = useProfilesQuery(isTest, {
    selectFromResult: ({ data }) => ({
      profiles: data?.filter((profile) => profile.un_sdg === `${fund_id}`),
    }),
  });
  return { profiles };
}
