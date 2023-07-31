import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import {
  Paginated,
  SingleTransactionRes,
  Transaction,
  TransactionsArgs,
  TransactionsRes,
} from "./types";
import { TransactionStatus } from "types/lists";
import { TxMeta } from "types/tx";
import { fromAbiStr } from "helpers";
import { blockTime, hasElapsed } from "helpers/admin";
import { EMPTY_DATA } from "constants/evm";

const GRAPHQL_ENDPOINT =
  "https://api.studio.thegraph.com/query/49156/angel-giving/v0.0.29";

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
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    proposals: builder.query<Paginated<Transaction[]>, TransactionsArgs>({
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
                  owners {
                    owner {
                      id
                    }
                  }
                },
                confirmations {
                  owner {
                    id
                  }
                }
              }
            }`,
          },
        };
      },
      transformResponse: (res: TransactionsRes, api, { page }) => {
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

        console.log({ res, transactions });

        return {
          items: transactions,
          next: transactions.length < TX_PER_PAGE ? undefined : page + 1,
        };
      },
    }),
    proposal: builder.query<Transaction, { recordId: string }>({
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
                  owners {
                    owner {
                      id
                    }
                  }
                },
                confirmations {
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
      }: SingleTransactionRes) => {
        console.log({ t });
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
  }),
});

export const {
  useProposalsQuery,
  useProposalQuery,
  useLazyProposalsQuery,
  util: { updateQueryData: updateSubgraphQueryData },
} = subgraph;

const txStatus = (expiry: string, executed: boolean): TransactionStatus =>
  executed ? "approved" : hasElapsed(+expiry) ? "expired" : "open";
