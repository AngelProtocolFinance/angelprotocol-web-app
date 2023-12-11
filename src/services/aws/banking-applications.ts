import {
  BankingApplicationUpdate,
  BankingApplicationsPage,
  BankingApplicationsQueryParams,
  EndowPayoutMethodsQueryParams,
  NewBankingApplication,
  PayoutMethod,
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
    updateBankingApplication: builder.mutation<
      unknown,
      BankingApplicationUpdate
    >({
      query: ({ uuid, ...payload }) => {
        return {
          method: "PUT",
          url: `/staging/banking-applications/${uuid}`,
          body: payload,
        };
      },
    }),
    bankingApplications: builder.query<
      BankingApplicationsPage,
      BankingApplicationsQueryParams
    >({
      query: (params) => {
        return {
          url: "/staging/banking-applications",
          params,
        };
      },
    }),
    payoutMethods: builder.query<PayoutMethod[], EndowPayoutMethodsQueryParams>(
      {
        query: (params) => {
          return {
            url: "/staging/banking-applications",
            params,
          };
        },
      }
    ),
  }),
});

export const {
  useNewBankingApplicationMutation,
  useUpdateBankingApplicationMutation,
  useBankingApplicationsQuery,
  usePayoutMethodsQuery,
  endpoints: {
    bankingApplications: { useLazyQuery: useLazyBankingApplicationsQuery },
  },
  util: { updateQueryData: updateBankingApplicationsQueryData },
} = bankingApplications;
