import {
  BankingApplication,
  BankingApplicationsQueryParams,
  NewBankingApplication,
} from "types/aws";
import { aws } from "./aws";

const bankingApplications = aws.injectEndpoints({
  endpoints: (builder) => ({
    newBankingApplication: builder.mutation<unknown, NewBankingApplication>({
      query: (payload) => {
        return {
          method: "POST",
          url: "/staging/banking-applications",
          body: payload,
        };
      },
    }),
    bankingApplications: builder.query<
      BankingApplication[],
      BankingApplicationsQueryParams
    >({
      query: (params) => {
        return {
          url: "/staging/banking-applications",
          params,
        };
      },
    }),
  }),
});

export const { useNewBankingApplicationMutation, useBankingApplicationsQuery } =
  bankingApplications;
