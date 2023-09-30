import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { TransactionsArgs } from "./types";
import { WithdrawEndowBeneficiary } from "services/types";
import { TransactionStatus } from "types/lists";
import {
  ApplicationProposalRes,
  GraphQLApplicationProposalRes,
  GraphQLEndowmentsRes,
  GraphQLTransactionRes,
  GraphQLTransactionsRes,
  Paginated,
  WithdrawBeneficiaryEndowmentsQueryParams,
} from "types/subgraph";
import { Transaction, TxMeta } from "types/tx";
import { fromAbiStr } from "helpers";
import { blockTime, hasElapsed } from "helpers/admin";
import { EMPTY_DATA } from "constant/evm";
import { GRAPHQL_ENDPOINT } from "constant/urls";
import { tags } from "./tags";

const customBaseQuery: BaseQueryFn = retry(
  async (args, api, extraOptions) => {
    return fetchBaseQuery({
      baseUrl: GRAPHQL_ENDPOINT,
    })(args, api, extraOptions);
  },
  { maxRetries: 1 }
);

const TX_PER_PAGE = 5;
export const subgraph = createApi({
  reducerPath: "subgraph",
  tagTypes: tags,
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    proposals: builder.query<Paginated<Transaction[]>, TransactionsArgs>({
      providesTags: ["transactions"],
      query: ({ page, status, multisigId }) => {
        const skip = (page - 1) * TX_PER_PAGE;

        const statusClause = ((status) => {
          switch (status) {
            case "expired":
              return `executed: false, expiry_lt:"${blockTime("now")}"`;
            case "open":
              return `executed: false, expiry_gte:"${blockTime("now")}"`;
            case "approved":
              return `executed: true`;
            default:
              return "";
          }
        })(status);

        return {
          method: "POST",
          body: {
            query: `{
              multiSigTransactions(
                orderBy: transactionId
                orderDirection: desc
                skip: ${skip}
                first: ${TX_PER_PAGE}
                where: { 
                  multiSig: "${multisigId}", 
                  ${statusClause}}
              ) {
                id
                executed
                metadata
                expiry
                transactionId
                multiSig {
                  owners (where:{ active:true }) {
                    owner {
                      id
                    }
                  }
                },
                confirmations(where:{confirmed:true}) {
                  owner {
                    id
                  }
                }
              }
            }`,
          },
        };
      },
      transformResponse: (res: GraphQLTransactionsRes, api, { page }) => {
        const transactions = res.data.multiSigTransactions.map((t) => {
          const parsed: TxMeta | undefined =
            t.metadata === EMPTY_DATA ? undefined : fromAbiStr(t.metadata);

          return {
            recordId: t.id,
            transactionId: +t.transactionId,
            expiry: +t.expiry,
            status: txStatus(t.expiry, t.executed),
            confirmations: t.confirmations.map((c) => c.owner.id.toLowerCase()),
            owners: t.multiSig.owners.map((o) => o.owner.id.toLowerCase()),
            meta: parsed,
          };
        });

        return {
          items: transactions,
          next: transactions.length < TX_PER_PAGE ? undefined : page + 1,
        };
      },
    }),
    proposal: builder.query<Transaction, { recordId: string }>({
      providesTags: ["transaction"],
      query: ({ recordId }) => {
        return {
          method: "POST",
          body: {
            query: `{
              multiSigTransaction(id: "${recordId}") {
                id
                executed
                metadata
                expiry
                transactionId
                multiSig {
                  owners(where:{ active: true }) {
                    owner {
                      id
                    }
                  }
                },
                confirmations(where:{confirmed:true}) {
                  owner {
                    id
                  }
                }
              }
            }`,
          },
        };
      },
      transformResponse: ({
        data: { multiSigTransaction: t },
      }: GraphQLTransactionRes) => {
        const parsed: TxMeta | undefined =
          t.metadata === EMPTY_DATA ? undefined : fromAbiStr(t.metadata);

        return {
          recordId: t.id,
          transactionId: +t.transactionId,
          expiry: +t.expiry,
          status: txStatus(t.expiry, t.executed),
          confirmations: t.confirmations.map((c) => c.owner.id.toLowerCase()),
          owners: t.multiSig.owners.map((o) => o.owner.id.toLowerCase()),
          meta: parsed,
        };
      },
    }),
    applicationProposal: builder.query<
      ApplicationProposalRes,
      { applicationId: number }
    >({
      providesTags: ["application-proposal"],
      query: ({ applicationId }) => {
        return {
          method: "POST",
          body: {
            query: `{
              applicationProposal(id: "${applicationId}") {
                id
                confirmations {
                  id
                  owner {
                    id
                  }
                }
                executed
                expiry
              }
            }`,
          },
        };
      },
      transformResponse(res: GraphQLApplicationProposalRes) {
        return res.data.applicationProposal;
      },
    }),
    beneficiaryEndowments: builder.query<
      WithdrawEndowBeneficiary[],
      WithdrawBeneficiaryEndowmentsQueryParams
    >({
      providesTags: ["transactions"],
      query: ({
        beneficiaryEndowName,
        withdrawerEndowId,
        withdrawerEndowType,
      }) => {
        const endowTypes =
          //FUTURE: handle type === "daf"
          withdrawerEndowType === "charity" ? "[Charity]" : "[Charity,Normal]";
        const searchClause = beneficiaryEndowName
          ? `name_contains_nocase: "${beneficiaryEndowName}"`
          : "";

        const NUM_ENDOW_PER_PAGE = 5;
        return {
          method: "POST",
          body: {
            //prettier-ignore
            query: `{
              endowments(
                first: ${NUM_ENDOW_PER_PAGE},
                where: {beneficiaryWallet: null, beneficiaryEndowment: null, id_not: "${withdrawerEndowId}", endowmentType_in: ${endowTypes}, ${searchClause} },
                orderBy: name
              ) {
                id
                name
              }
            }`,
          },
        };
      },
      transformResponse: (res: GraphQLEndowmentsRes) => {
        return res.data.endowments.map((e) => ({
          ...e,
          name: e.name || "Default endow name",
        }));
      },
    }),
  }),
});

const txStatus = (expiry: string, executed: boolean): TransactionStatus =>
  executed ? "approved" : hasElapsed(+expiry) ? "expired" : "open";
