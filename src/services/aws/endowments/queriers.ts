import useWalletContext from "hooks/useWalletContext";
import { chainIDs } from "constants/chainIDs";
import { endowments_api } from "./endowments";

export function useCategorizedProfiles() {
  const { useUseCategorizedProfilesQuery } = endowments_api;
  const { wallet } = useWalletContext();
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
  const { wallet } = useWalletContext();
  const isTest = wallet?.network.chainID === chainIDs.testnet;

  const { profiles = [] } = useProfilesQuery(isTest, {
    selectFromResult: ({ data }) => ({
      profiles: data?.filter((profile) => profile.un_sdg === fund_id),
    }),
  });
  return { profiles };
}
