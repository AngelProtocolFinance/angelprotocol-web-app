import { TEMP_JWT } from "constants/auth";
import type { UserEndow, UserUpdate } from "types/aws";
import { version as v } from "../helpers";
import { aws } from "./aws";

const endowAdmins = aws.injectEndpoints({
  endpoints: (builder) => ({
    editUser: builder.mutation<UserUpdate, UserUpdate & { userEmail: string }>({
      invalidatesTags: ["user"],
      query: ({ userEmail, ...payload }) => {
        return {
          method: "PATCH",
          url: `/${v(2)}/users/${userEmail}`,
          headers: { Authorization: TEMP_JWT },
          body: payload,
        };
      },
    }),
    userEndows: builder.query<UserEndow[], string>({
      query: (userId) => ({
        url: `/${v(2)}/users/${userId}/endowments`,
        headers: { authorization: TEMP_JWT },
      }),
    }),
  }),
});

export const { useEditUserMutation, useUserEndowsQuery } = endowAdmins;
