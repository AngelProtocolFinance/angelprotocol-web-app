import { NewEndowAdmin } from "types/aws/ap/users";
import { TEMP_JWT } from "constants/auth";
import { version as v } from "../helpers";
import { aws } from "./aws";

const users = aws.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query<string[], number>({
      providesTags: ["users"],
      query: (endowID) => {
        return {
          url: `/${v(1)}/users/${endowID}`,
          headers: { Authorization: TEMP_JWT },
        };
      },
    }),
    newEndowAdmin: builder.mutation<unknown, NewEndowAdmin>({
      invalidatesTags: (_, error) => (error ? [] : ["users"]),
      query: ({ endowID, ...payload }) => {
        return {
          method: "POST",
          url: `/${v(1)}/users/${endowID}`,
          body: payload,
          headers: { Authorization: TEMP_JWT },
        };
      },
    }),
  }),
});

export const { useUsersQuery, useNewEndowAdminMutation } = users;
