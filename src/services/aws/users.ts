import { TEMP_JWT } from "constants/auth";
import type { UserAttributes } from "types/aws";
import { version as v } from "../helpers";
import { aws } from "./aws";

const endowAdmins = aws.injectEndpoints({
  endpoints: (builder) => ({
    editUser: builder.mutation<
      Partial<UserAttributes>,
      Partial<UserAttributes> & { userEmail: string }
    >({
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
  }),
});

export const { useEditUserMutation } = endowAdmins;
