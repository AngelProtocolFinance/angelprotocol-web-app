import { TEMP_JWT } from "constants/auth";
import { version as v } from "../helpers";
import { aws } from "./aws";

const users = aws.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query<string[], number>({
      providesTags: ["banking-applications"],
      query: (endowID) => {
        return {
          url: `/${v(1)}/users/${endowID}`,
          headers: { Authorization: TEMP_JWT },
        };
      },
    }),
  }),
});

export const { useUsersQuery } = users;
