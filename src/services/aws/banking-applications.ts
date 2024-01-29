import { TEMP_JWT } from "constants/auth";
import { RootState } from "store/store";
import { userIsSignedIn } from "types/auth";
import {
  BankingApplication,
  BankingApplicationUpdate,
  BankingApplicationsPage,
  BankingApplicationsQueryParams,
  NewBankingApplication,
  PayoutMethod,
  V2RecipientAccount,
} from "types/aws";
import { version as v } from "../helpers";
import { BankingApplicationDetails } from "../types";
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
      invalidatesTags: (_, error) =>
        error ? [] : ["banking-applications", "banking-application"],
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
    bankingApplication: builder.query<
      BankingApplicationDetails,
      { uuid: string } & (
        | { requestor: "bg-admin" }
        | { requestor: "endowment"; endowmentID: number }
      )
    >({
      providesTags: ["banking-application"],
      async queryFn({ uuid, ...params }, api, extraOptions, baseQuery) {
        const {
          auth: { user },
        } = api.getState() as RootState;
        const token = userIsSignedIn(user) ? user.token : "";

        const bankRecordPromise = baseQuery({
          url: `${v(1)}/banking-applications/${uuid}`,
          headers: { Authorization: token },
          params,
        });
        const wiseRecipientPromise = baseQuery({
          url: `/${v(1)}/wise-proxy/v2/accounts/${uuid}`,
          headers: { Authorization: token },
        });

        const [bankRecordRes, wiseRecipientRes] = await Promise.all([
          bankRecordPromise,
          wiseRecipientPromise,
        ]);

        if (bankRecordRes.error || wiseRecipientRes.error) {
          return { error: { status: 500, data: "Failed to get bank details" } };
        }

        const recipient = wiseRecipientRes.data as V2RecipientAccount;
        const record = bankRecordRes.data as BankingApplication;

        return { data: { ...record, ...recipient } };
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
  useBankingApplicationQuery,
  useDeleteBankingApplicationMutation,
  usePayoutMethodsQuery,
  endpoints: {
    bankingApplications: { useLazyQuery: useLazyBankingApplicationsQuery },
  },
  util: { updateQueryData: updateBankingApplicationsQueryData },
} = bankingApplications;
