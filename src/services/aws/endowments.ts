import { CategorizedProfiles } from "services/types";
import { AWSQueryRes, Profile } from "types/server/aws";
import { aws } from "./aws";
import { awsTags, chaTags } from "./tags";

export const endowments_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query<Profile, string>({
      providesTags: [{ type: awsTags.cha, id: chaTags.profile }],
      query: (charity_address) => `endowments/info/${charity_address}`,
    }),

    useCategorizedProfiles: builder.query<CategorizedProfiles, boolean>({
      providesTags: [{ type: awsTags.cha, id: chaTags.profiles }],
      query: (isTest) => `endowments/info${isTest ? "/testnet" : ""}`,
      //transform response before saving to cache for easy lookup by component
      transformResponse: (res: AWSQueryRes<Profile[]>) => {
        return res.Items.reduce((result, profile) => {
          if (
            profile.un_sdg === undefined ||
            profile.un_sdg === "" ||
            profile.tier === 1
          ) {
            return result;
          } else {
            if (!result[+profile.un_sdg]) {
              result[+profile.un_sdg] = [];
            }
            result[+profile.un_sdg].push(profile);
            return result;
          }
        }, {} as CategorizedProfiles);
      },
    }),
  }),
});
export const { useProfileQuery, useUseCategorizedProfilesQuery } =
  endowments_api;

export const useProfileQueryState =
  endowments_api.endpoints.profile.useQueryState;
