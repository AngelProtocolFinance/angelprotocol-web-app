import {
  BankingApplicationUpdate,
  BankingApplicationsPage,
  BankingApplicationsQueryParams,
  NewBankingApplication,
  PayoutMethod,
} from "types/aws";
import { aws } from "./aws";

const bankingApplications = aws.injectEndpoints({
  endpoints: (builder) => ({
    newBankingApplication: builder.mutation<unknown, NewBankingApplication>({
      invalidatesTags: (_, error) => (error ? [] : ["banking-applications"]),
      query: (payload) => {
        return {
          method: "POST",
          url: "/staging/banking-applications",
          body: payload,
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
          url: `/staging/banking-applications/${uuid}`,
          body: payload,
        };
      },
    }),
    deleteBankingApplication: builder.mutation<unknown, string>({
      invalidatesTags: (_, error) => (error ? [] : ["banking-applications"]),
      query: (uuid) => {
        return {
          method: "DELETE",
          url: `/staging/banking-applications/${uuid}`,
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
          url: "/staging/banking-applications",
          params: { ...params, requestor: "bg-admin" },
        };
      },
    }),
    payoutMethods: builder.query<PayoutMethod[], number>({
      providesTags: ["banking-applications"],
      query: (endowmentID) => {
        return {
          url: "/staging/banking-applications",
          params: { endowmentID, requestor: "endowment" },
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
