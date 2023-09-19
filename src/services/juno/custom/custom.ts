import {
  AdminResource,
  EndowBalance,
  EndowmentState,
  IERC20,
  WithdrawData,
} from "../../types";
import { BridgeFeesRes } from "types/aws";
import { AcceptedTokens, AccountType } from "types/contracts";
import { MultisigOwnersRes, MultisigRes } from "types/subgraph";
import { version as v } from "services/helpers";
import { IS_AST, IS_TEST } from "constant/env";
import { APIs, GRAPHQL_ENDPOINT } from "constant/urls";
import { junoApi } from "../index";
import { queryContract } from "../queryContract";
import { multisigRecordId } from "./constants";

export const customApi = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    isMember: builder.query<boolean, { user: string; endowmentId?: string }>({
      providesTags: ["multisig-subgraph"],
      async queryFn({ endowmentId = "", user }) {
        const {
          multiSig: { owners },
        } = await querySubgraph<{ multiSig: MultisigOwnersRes }>(`{
          multiSig(id:"${multisigRecordId(endowmentId)[0]}") {
            owners (where:{ active:true }) {
              owner {
                id
              }
            }
          }
        }`);

        return {
          data: owners.some(({ owner: { id } }) => id.toLowerCase() === user),
        };
      },
    }),
    adminResource: builder.query<AdminResource, { endowmentId?: string }>({
      providesTags: ["accounts.endowment", "multisig-subgraph"],
      async queryFn({ endowmentId = "" }) {
        const [recordId, type] = multisigRecordId(endowmentId);
        const [{ multiSig: m }, endowment, stateRes] = await Promise.all([
          querySubgraph<{ multiSig: MultisigRes }>(`{
            multiSig(id: "${recordId}") {
              id
              address
              owners (where:{active:true}) {
                owner {
                  id
                }
              }
              approvalsRequired
              requireExecution
              transactionExpiry
            }
          }`),
          typeof recordId === "number"
            ? queryContract("accounts.endowment", { id: recordId })
            : null,
          typeof recordId === "number"
            ? queryContract("accounts.state", { id: recordId })
            : null,
        ]);

        const state: EndowmentState | null = stateRes
          ? {
              closed: stateRes.closingEndowment,
              closingBeneficiary: (() => {
                const {
                  enumData,
                  data: { addr, endowId },
                } = stateRes.closingBeneficiary;
                return {
                  type: (["endowment", "wallet", "treasury"] as const)[
                    enumData
                  ],
                  value: [endowId.toString(), addr][enumData],
                };
              })(),
            }
          : null;

        const resource: AdminResource = {
          type: type as any,
          multisig: m.address.toLowerCase(),
          members: m.owners.map(({ owner: { id } }) => id.toLowerCase()),
          id: typeof recordId === "number" ? recordId : 0,
          config: {
            threshold: +m.approvalsRequired,
            requireExecution: m.requireExecution,
            duration: +m.transactionExpiry,
          },
          ...(endowment || {}),
          ...(state || {}),
        };
        return { data: resource };
      },
    }),
    endowBalance: builder.query<EndowBalance, { id: number }>({
      providesTags: ["accounts.token-balance"],
      queryFn: async ({ id }) => ({ data: await endowBalance(id) }),
    }),

    withdrawData: builder.query<WithdrawData, { id: number }>({
      providesTags: ["accounts.token-balance"],
      queryFn: async ({ id }) => {
        const bridgeFeesPromise = fetch(
          APIs.apes + `/${v(2)}/axelar-bridge-fees`
        ).then<BridgeFeesRes>((res) => {
          if (!res.ok) throw new Error("Failed to get fees");
          return res.json();
        });

        const [
          balances,
          bridgeFees,
          earlyLockedWithdrawFeeSetting,
          withdrawFeeSetting,
        ] = await Promise.all([
          endowBalance(id),
          bridgeFeesPromise,
          queryContract("registrar.fee-setting", {
            type: IS_AST ? "EarlyLockedWithdraw" : "EarlyLockedWithdrawCharity",
          }),
          queryContract("registrar.fee-setting", {
            type: IS_AST ? "Withdraw" : "WithdrawCharity",
          }),
        ]);

        return {
          data: {
            balances,
            //juno field not present in /staging - fill for consistent type definition
            bridgeFees: IS_TEST
              ? { ...bridgeFees["withdraw"], juno: 0 }
              : bridgeFees["withdraw"],
            protocolFeeRates: {
              withdrawBps: withdrawFeeSetting.bps,
              earlyLockedWithdrawBps: earlyLockedWithdrawFeeSetting.bps,
            },
          },
        };
      },
    }),
  }),
});

async function endowBalance(id: number): Promise<EndowBalance> {
  //TODO: query registrar
  const tokens: AcceptedTokens = {
    cw20: ["0x2c852e740B62308c46DD29B982FBb650D063Bd07"],
  };

  const balances = (type: AccountType) =>
    Promise.all(
      tokens.cw20.map((t) =>
        queryContract("accounts.token-balance", {
          id,
          accounType: type,
          token: t,
        }).then<IERC20>((b) => ({
          address: t,
          amount: b,
        }))
      )
    );
  const [locked, liquid] = await Promise.all([balances(0), balances(1)]);
  return { locked, liquid };
}

export const {
  useIsMemberQuery,
  useAdminResourceQuery,
  useEndowBalanceQuery,
  useWithdrawDataQuery,
} = customApi;

type Result<T> = { data: T } | { errors: unknown };
async function querySubgraph<T>(query: string): Promise<T> {
  return fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  })
    .then<Result<T>>((res) => {
      if (!res.ok) throw new Error(`Failed grapQL request:${query}`);
      return res.json();
    })
    .then((data) => {
      if ("errors" in data) throw new Error(`Failed grapQL request:${query}`);
      return data.data;
    });
}
