import { UserTypes } from "pages/Registration/store";
import { AWSQueryRes } from "services/aws/types";
import createAuthToken from "helpers/createAuthToken";
import { aws } from "../aws";
import { cha, tags } from "../tags";
import {
  CategorizedProfiles,
  EditableProfileAttr,
  Lookup,
  Profile,
} from "./types";

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
        { type: tags.cha, id: cha.profile },
        { type: tags.cha, id: cha.profiles },
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
