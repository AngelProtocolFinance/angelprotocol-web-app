import { useProfilesQuery } from "services/aws/endowments/endowments";

export default function useProfiles(fund_id: number) {
  const { profiles = [] } = useProfilesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      profiles: data?.filter((profile) => profile.un_sdg === `${fund_id}`),
    }),
  });

  return profiles;
}
