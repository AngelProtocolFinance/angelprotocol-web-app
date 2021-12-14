import { useProfilesQuery } from "services/aws/endowments/endowments";
import { profile as profile_placeholder } from "services/aws/endowments/placeholders";
export default function useProfile(address: string) {
  const { profile = profile_placeholder } = useProfilesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      profile: data?.find((profile) => profile.endowment_address === address),
    }),
  });
  return profile;
}
