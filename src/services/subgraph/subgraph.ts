import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import Decimal from "decimal.js";
import {
  Paginated,
  Transaction,
  TransactionsArgs,
  TransactionsRes,
} from "./types";
import { TransactionStatus } from "types/lists";
import { blockTime, hasElapsed } from "helpers/admin";

type Result = { result: string };

const GRAPHQL_ENDPOINT =
  "https://api.studio.thegraph.com/query/49156/angel-giving/version/latest";

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
      query: ({ page, status, multisig }) => {
        const skip = (page - 1) * TX_PER_PAGE;

        const statusClause =
          status === "expired"
            ? `executed: false, expiry_lt:"${blockTime("now")}"`
            : status === "open"
            ? `executed: false, expiry_gte:"${blockTime("now")}"`
            : `executed: true`;

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
                  multiSig: "${multisig}", 
                  ${statusClause}}
              ) {
                executed
                expiry
                transactionId
                multiSig {
                  owners {
                    id
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
      transformResponse: (res: TransactionsRes, api, { page, status }) => {
        const transactions = res.data.multiSigTransactions.map((t) => {
          const status: TransactionStatus = t.executed
            ? "approved"
            : hasElapsed(t.expiry)
            ? "expired"
            : "open";

          //TODO: add once live
          // const parsed: TxMeta | undefined =
          //   t.metadata === EMPTY_DATA
          //     ? undefined
          //     : fromAbiStr(t.metadata);

          return {
            id: t.transactionId,
            title: `Transaction ${t.transactionId}`,
            expiry: t.expiry,
            status,
            confirmations: t.confirmations.map((c) => c.owner.id.toLowerCase()),
            owners: t.multiSig.owners.map((o) => o.id.toLowerCase()),
          };
        });

        return {
          items: transactions,
          next: transactions.length < TX_PER_PAGE ? undefined : page + 1,
        };
      },
    }),
    latestBlock: builder.query<string, unknown>({
      query: () => ({
        method: "POST",
        body: { jsonrpc: "2.0", id: 1, method: "eth_blockNumber", params: [] },
      }),
      transformResponse: (res: Result) => {
        return new Decimal(res.result).toString();
      },
    }),
  }),
});

export const { useProposalsQuery, useLazyProposalsQuery } = subgraph;
