import { TEMP_JWT } from "constants/auth";
import { version as v } from "../helpers";
import { aws } from "./aws";

const bankingApplications = aws.injectEndpoints({
  endpoints: (builder) => ({
    deleteBankingApplication: builder.mutation<unknown, string>({
      invalidatesTags: (_, error) =>
        error ? [] : ["banking-applications", "banking-application"],
      query: (uuid) => {
        return {
          method: "DELETE",
          url: `/${v(1)}/banking-applications/${uuid}`,
          headers: { Authorization: TEMP_JWT },
        };
      },
    }),
  }),
});

export const {
  useDeleteBankingApplicationMutation,
  util: { updateQueryData: updateBankingApplicationsQueryData },
} = bankingApplications;
