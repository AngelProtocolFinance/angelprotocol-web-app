import { TEMP_JWT } from "constants/auth";
import type { EndowAdmin } from "types/aws";
import type {
  DeleteEndowAdminPayload,
  NewEndowAdminPayload,
} from "types/aws/ap/users";
import { version as v } from "../helpers";
import { aws } from "./aws";

const endowAdmins = aws.injectEndpoints({
  endpoints: (builder) => ({
    endowAdmins: builder.query<EndowAdmin[], number>({
      providesTags: ["endow-admins"],
      query: (endowID) => {
        return {
          url: `/${v(2)}/endowments/${endowID}/admins`,
          headers: { Authorization: TEMP_JWT },
        };
      },
    }),
    newEndowAdmin: builder.mutation<unknown, NewEndowAdminPayload>({
      invalidatesTags: (_, error) => (error ? [] : ["endow-admins"]),
      query: ({ endowID, ...payload }) => {
        return {
          method: "POST",
          url: `/${v(2)}/endowments/${endowID}/admins`,
          body: payload,
          headers: { Authorization: TEMP_JWT },
        };
      },
    }),
    deleteEndowAdmin: builder.mutation<unknown, DeleteEndowAdminPayload>({
      invalidatesTags: (_, error) => (error ? [] : ["endow-admins"]),
      query: ({ endowID, ...payload }) => {
        return {
          method: "DELETE",
          url: `/${v(2)}/endowments/${endowID}/admins/${payload.email}`,
          headers: { Authorization: TEMP_JWT },
        };
      },
    }),
  }),
});

export const {
  useEndowAdminsQuery,
  useNewEndowAdminMutation,
  useDeleteEndowAdminMutation,
} = endowAdmins;
