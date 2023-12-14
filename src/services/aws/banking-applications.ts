import {
  BankingApplicationUpdate,
  BankingApplicationsPage,
  BankingApplicationsQueryParams,
  NewBankingApplication,
  PayoutMethod,
} from "types/aws";
import { TEMP_JWT } from "constants/auth";
import { version as v } from "../helpers";
import { aws } from "./aws";

const bankingApplications = aws.injectEndpoints({
  endpoints: (builder) => ({
    newBankingApplication: builder.mutation<unknown, NewBankingApplication>({
      invalidatesTags: (_, error) => (error ? [] : ["banking-applications"]),
      query: (payload) => {
        return {
          method: "POST",
          url: `/${v(1)}/banking-applications`,
          body: payload,
          headers: { Authorization: TEMP_JWT },
        };
      },
    }),
    updateBankingApplication: builder.mutation<
      unknown,
      BankingApplicationUpdate
    >({
      invalidatesTags: (_, error) => (error ? [] : ["banking-applications"]),
      query: ({ uuid, ...payload }) => {
        return {
          method: "PUT",
          url: `/${v(1)}/banking-applications/${uuid}`,
          body: payload,
          headers: { Authorization: TEMP_JWT },
        };
      },
    }),
    deleteBankingApplication: builder.mutation<unknown, string>({
      invalidatesTags: (_, error) => (error ? [] : ["banking-applications"]),
      query: (uuid) => {
        return {
          method: "DELETE",
          url: `/${v(1)}/banking-applications/${uuid}`,
          headers: { Authorization: TEMP_JWT },
        };
      },
    }),
    bankingApplications: builder.query<
      BankingApplicationsPage,
      BankingApplicationsQueryParams
    >({
      providesTags: ["banking-applications"],
      query: (params) => {
        return {
          url: `/${v(1)}/banking-applications`,
          params: { ...params, requestor: "bg-admin" },
          headers: { Authorization: TEMP_JWT },
        };
      },
    }),
    payoutMethods: builder.query<PayoutMethod[], number>({
      providesTags: ["banking-applications"],
      query: (endowmentID) => {
        return {
          url: `/${v(1)}/banking-applications`,
          params: { endowmentID, requestor: "endowment" },
          headers: { Authorization: TEMP_JWT },
        };
      },
    }),
  }),
});

export const {
  useNewBankingApplicationMutation,
  useUpdateBankingApplicationMutation,
  useBankingApplicationsQuery,
  useDeleteBankingApplicationMutation,
  usePayoutMethodsQuery,
  endpoints: {
    bankingApplications: { useLazyQuery: useLazyBankingApplicationsQuery },
  },
  util: { updateQueryData: updateBankingApplicationsQueryData },
} = bankingApplications;
