import createAuthToken from "helpers/createAuthToken";
import { UserTypes } from "services/user/types";
import { aws } from "../aws";
import { cha, tags } from "../tags";
import { Lookup, Endowment, Profile, CategorizedProfiles } from "./types";
import { AWSQueryRes } from "services/aws/types";

export const endowments_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    lookup: builder.query<Lookup, boolean>({
      query: (isTest) => `endowments${isTest ? "/testnet" : ""}?except_tier=1`,
      transformResponse: (res: AWSQueryRes<Endowment[]>) => {
        const _lookup: Lookup = {};
        res.Items.forEach((endowment) => {
          _lookup[endowment.owner] = endowment.address;
        });
        return _lookup;
      },
    }),

    profile: builder.query<Profile, string>({
      providesTags: [{ type: tags.cha, id: cha.profile }],
      query: (charity_address) => `endowments/info/${charity_address}`,
    }),

    profiles: builder.query<Profile[], boolean>({
      query: (isTest) => `endowments/info${isTest ? "/testnet" : ""}`,
      //transform response before saving to cache for easy lookup by component
      transformResponse: (res: AWSQueryRes<Profile[]>) => {
        return res.Items;
      },
    }),
    useCategorizedProfiles: builder.query<CategorizedProfiles, boolean>({
      query: (isTest) => `endowments/info${isTest ? "/testnet" : ""}`,
      //transform response before saving to cache for easy lookup by component
      transformResponse: (res: AWSQueryRes<Profile[]>) => {
        const x = res.Items.reduce((result, profile) => {
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
        console.log(x);
        return x;
      },
    }),
    updateProfile: builder.mutation<
      any,
      {
        body: Partial<Profile>;
        endowment_address: string;
        charity_owner: string;
      }
    >({
      query: (data) => {
        const generatedToken = createAuthToken(UserTypes.CHARITY_OWNER);
        return {
          // URL of the request needs a query param because the endowment_data DB table has a partition key (endowment_address) and sort key (charity_owner)
          url: `endowments/info/${data.endowment_address}`,
          method: "PUT",
          body: data.body,
          headers: {
            authorization: generatedToken,
          },
          params: { charity_owner: data.charity_owner },
        };
      },
      transformResponse: (response: { data: any }) => response,
      invalidatesTags: [{ type: tags.cha, id: cha.profile }],
    }),
  }),
});
export const {
  useLookupQuery,
  useProfileQuery,
  useProfilesQuery,
  useUpdateProfileMutation,
} = endowments_api;
