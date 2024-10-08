import { TEMP_JWT } from "constants/auth";
import type {
  AletPrefUpdate,
  UserEndow,
  UserFund,
  UserUpdate,
} from "types/aws";
import { version as v } from "../helpers";
import { aws } from "./aws";

const endowAdmins = aws.injectEndpoints({
  endpoints: (builder) => ({
    editUser: builder.mutation<UserUpdate, UserUpdate & { userEmail: string }>({
      invalidatesTags: ["user"],
      query: ({ userEmail, ...payload }) => {
        return {
          method: "PATCH",
          url: `/${v(3)}/users/${userEmail}`,
          headers: { Authorization: TEMP_JWT },
          body: payload,
        };
      },
    }),
    userEndows: builder.query<UserEndow[], string>({
      providesTags: ["user-endows"],
      query: (userId) => ({
        url: `/${v(3)}/users/${userId}/endowments`,
        headers: { authorization: TEMP_JWT },
      }),
    }),
    userFunds: builder.query<UserFund[], string>({
      providesTags: ["user-funds"],
      query: (userId) => ({
        url: `/${v(3)}/users/${userId}/funds`,
        headers: { authorization: TEMP_JWT },
      }),
    }),
    updateUserEndows: builder.mutation<
      unknown,
      { userId: string; alertPrefs: AletPrefUpdate[] }
    >({
      invalidatesTags: ["user-endows"],
      query: ({ userId, alertPrefs }) => {
        return {
          method: "PATCH",
          url: `/${v(3)}/users/${userId}/endowments`,
          body: { alertPrefs },
          headers: { authorization: TEMP_JWT },
        };
      },
    }),
  }),
});

export const {
  useEditUserMutation,
  useUserEndowsQuery,
  useUserFundsQuery,
  useUpdateUserEndowsMutation,
} = endowAdmins;
