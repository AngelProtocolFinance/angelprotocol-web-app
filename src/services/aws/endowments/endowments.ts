import { AWSQueryRes, awsTags, chaTags } from "types/services/aws";
import {
  CategorizedProfiles,
  EditableProfileAttr,
  Lookup,
  Profile,
} from "types/services/aws/endowments";
import { UserTypes } from "services/user/types";
import createAuthToken from "helpers/createAuthToken";
import { aws } from "../aws";

export const endowments_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    lookup: builder.query<Lookup, boolean>({
      query: (isTest) => `endowments/info${isTest ? "/testnet" : ""}`,
      transformResponse: (res: AWSQueryRes<Profile[]>) => {
        const _lookup: Lookup = {};
        res.Items.forEach((endowment) => {
          _lookup[endowment.charity_owner] = endowment.endowment_address;
        });
        return _lookup;
      },
    }),

    profile: builder.query<Profile, string>({
      providesTags: [{ type: awsTags.cha, id: chaTags.profile }],
      query: (charity_address) => `endowments/info/${charity_address}`,
    }),

    profiles: builder.query<Profile[], boolean>({
      providesTags: [{ type: awsTags.cha, id: chaTags.profiles }],
      query: (isTest) => `endowments/info${isTest ? "/testnet" : ""}`,
      //transform response before saving to cache for easy lookup by component
      transformResponse: (res: AWSQueryRes<Profile[]>) => {
        return res.Items;
      },
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
    updateProfile: builder.mutation<
      any,
      { owner: string; address: string; edits: Partial<EditableProfileAttr> }
    >({
      query: (args) => {
        const generatedToken = createAuthToken(UserTypes.CHARITY_OWNER);
        return {
          // URL of the request needs a query param because the endowment_data DB table has a partition key (endowment_address) and sort key (charity_owner)
          url: `endowments/info/${args.address}`,
          method: "PUT",
          body: args.edits,
          headers: {
            authorization: generatedToken,
          },
          params: { charity_owner: args.owner },
        };
      },
      invalidatesTags: [
        { type: awsTags.cha, id: chaTags.profile },
        { type: awsTags.cha, id: chaTags.profiles },
      ],
    }),
  }),
});
export const {
  useLookupQuery,
  useProfileQuery,
  useProfilesQuery,
  useUpdateProfileMutation,
} = endowments_api;
