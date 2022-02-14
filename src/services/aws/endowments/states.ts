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
