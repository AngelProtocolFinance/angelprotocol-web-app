import createAuthToken from "helpers/createAuthToken";
import { cha, tags } from "services/terra/tags";
import { UserTypes } from "services/user/types";
import { aws } from "../aws";
import { QueryRes, Lookup, Accounts, Endowment, Profile } from "./types";

const endowments_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    lookup: builder.query<Lookup, boolean>({
      query: (isTest) => `endowments${isTest ? "/testnet" : ""}`,
      transformResponse: (res: QueryRes<Endowment[]>) => {
        const _lookup: Lookup = {};
        res.Items.forEach((endowment) => {
          _lookup[endowment.owner] = endowment.address;
        });
        return _lookup;
      },
    }),
    accounts: builder.query<Accounts, boolean>({
      query: (isTest) => `endowments${isTest ? "/testnet" : ""}`,
      //transform response before saving to cache for easy lookup by component
      transformResponse: (res: QueryRes<Endowment[]>) => {
        const _accounts: Accounts = {};
        res.Items.forEach(
          ({
            address,
            name,
            description,
            url,
            icon,
            iconLight = false,
            tier,
          }) => {
            _accounts[address] = {
              name,
              description,
              url,
              icon,
              iconLight,
              tier,
            };
          }
        );
        return _accounts;
      },
    }),
    endowments: builder.query<Endowment[], boolean>({
      query: (isTest) => `endowments${isTest ? "/testnet" : ""}`,
      transformResponse: (res: QueryRes<Endowment[]>) => {
        return res.Items;
      },
    }),

    profile: builder.query<Profile, string>({
      providesTags: [{ type: tags.cha, id: cha.profile }],
      query: (charity_address) => `endowments/profiles/${charity_address}`,
    }),

    profiles: builder.query<Profile[], boolean>({
      query: (isTest) => `endowments/profiles${isTest ? "/testnet" : ""}`,
      //transform response before saving to cache for easy lookup by component
      transformResponse: (res: QueryRes<Profile[]>) => {
        return res.Items;
      },
    }),
    updateProfile: builder.mutation<
      any,
      { body: Partial<Profile>; endowment_address: string }
    >({
      query: (data) => {
        const generatedToken = createAuthToken(UserTypes.CHARITY_OWNER);
        return {
          url: `endowments/profiles/${data.endowment_address}`,
          method: "PUT",
          body: data.body,
          headers: {
            authorization: generatedToken,
          },
        };
      },
      transformResponse: (response: { data: any }) => response,
      invalidatesTags: [{ type: tags.cha, id: cha.profile }],
    }),
  }),
});
export const {
  useLookupQuery,
  useAccountsQuery,
  useEndowmentsQuery,
  useProfileQuery,
  useProfilesQuery,
  useUpdateProfileMutation,
} = endowments_api;
