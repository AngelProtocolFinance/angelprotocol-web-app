import { aws } from "../aws";
import { cha, tags } from "../tags";
import { Profile, CategorizedProfiles, AWSCharityProfile } from "./types";
import { AWSQueryRes } from "services/aws/types";

export const endowments_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query<Profile, string>({
      providesTags: [{ type: tags.cha, id: cha.profile }],
      query: (charity_address) => `endowments/info/${charity_address}`,
    }),

    profiles: builder.query<Profile[], boolean>({
      providesTags: [{ type: tags.cha, id: cha.profiles }],
      query: (isTest) => `endowments/info${isTest ? "/testnet" : ""}`,
      //transform response before saving to cache for easy lookup by component
      transformResponse: (res: AWSQueryRes<Profile[]>) => {
        return res.Items;
      },
    }),
    useCategorizedProfiles: builder.query<CategorizedProfiles, boolean>({
      providesTags: [{ type: tags.cha, id: cha.profiles }],
      query: (isTest) => `endowments/info${isTest ? "/testnet" : ""}`,
      //transform response before saving to cache for easy lookup by component
      transformResponse: (res: AWSQueryRes<AWSCharityProfile[]>) => {
        return res.Items.reduce((result, profile) => {
          if (profile.un_sdg === undefined || profile.tier === 1) {
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
export const { useProfileQuery, useProfilesQuery } = endowments_api;
