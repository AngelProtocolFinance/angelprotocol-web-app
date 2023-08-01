import {
  AdminResources,
  CharityApplication,
  EndowBalance,
  IERC20,
  WithdrawData,
} from "../../types";
import { BridgeFeesRes } from "types/aws";
import { AcceptedTokens, AccountType } from "types/contracts";
import { version as v } from "services/helpers";
import { idParamToNum } from "helpers";
import { IS_AST, IS_TEST } from "constants/env";
import { APIs } from "constants/urls";
import { junoApi } from "..";
import { queryContract } from "../queryContract";
import { apCWs, multisigInfo } from "./helpers/admin-resource";

export const customApi = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    isMember: builder.query<boolean, { user: string; endowmentId?: string }>({
      providesTags: ["multisig.members", "accounts.endowment"],
      async queryFn(args) {
        const numId = idParamToNum(args.endowmentId);
        const AP = apCWs[numId];
        /** special case for ap admin usage */
        if (AP) {
          const { multisig } = AP;
          //skip endowment query, query hardcoded cw3 straight
          const members = await queryContract("multisig.members", { multisig });

          return {
            data: members.includes(args.user),
          };
        }

        const endowment = await queryContract("accounts.endowment", {
          id: numId,
        });

        const members = await queryContract("multisig.members", {
          multisig: endowment.owner,
        });

        return {
          data: members.includes(args.user),
        };
      },
    }),
    adminResources: builder.query<
      AdminResources,
      { endowmentId?: string; user?: string }
    >({
      providesTags: [
        "multisig.members",
        "multisig.threshold",
        "multisig.require-execution",
        "multisig.tx-duration",
        "accounts.endowment",
      ],
      async queryFn(args) {
        const numId = idParamToNum(args.endowmentId);
        const AP = apCWs[numId];
        /** special case for ap admin usage */
        if (AP) {
          const { multisig, type } = AP;
          //skip endowment query, query hardcoded cw3 straight

          const [config, members] = await multisigInfo(multisig, args.user);

          return {
            data: {
              type: type as any,
              id: numId,
              members,
              multisig,
              config,
            },
          };
        }

        const endowment = await queryContract("accounts.endowment", {
          id: numId,
        });

        const [config, members] = await multisigInfo(
          endowment.owner,
          args.user
        );

        return {
          data: {
            type: "charity",
            id: numId,
            members,
            multisig: endowment.owner,
            config,
            ...endowment,
          },
        };
      },
    }),
    endowBalance: builder.query<EndowBalance, { id: number }>({
      providesTags: ["accounts.token-balance"],
      queryFn: async ({ id }) => ({ data: await endowBalance(id) }),
    }),

    withdrawData: builder.query<WithdrawData, { id: number }>({
      providesTags: ["accounts.token-balance"],
      queryFn: async ({ id }) => {
        const bridgeFees = fetch(
          APIs.apes + `/${v(2)}/axelar-bridge-fees`
        ).then<BridgeFeesRes>((res) => {
          if (!res.ok) throw new Error("Failed to get fees");
          return res.json();
        });

        const [
          balances,
          fees,
          earlyLockedWithdrawFeeSetting,
          withdrawFeeSetting,
        ] = await Promise.all([
          endowBalance(id),
          bridgeFees,
          queryContract("registrar.fee-setting", {
            type: IS_AST
              ? "EarlyLockedWithdrawNormal"
              : "EarlyLockedWithdrawCharity",
          }),
          queryContract("registrar.fee-setting", {
            type: IS_AST ? "WithdrawNormal" : "WithdrawCharity",
          }),
        ]);
        return {
          data: {
            balances,
            //juno field not present in /staging - fill for consistent type definition
            bridgeFees: IS_TEST
              ? { ...fees["withdraw"], juno: 0 }
              : fees["withdraw"],
            protocolFeeRates: {
              withdrawBps: withdrawFeeSetting.bps,
              earlyLockedWithdrawBps: earlyLockedWithdrawFeeSetting.bps,
            },
          },
        };
      },
    }),

    application: builder.query<
      CharityApplication,
      { id: number; user?: string }
    >({
      providesTags: [
        "multisig/review.prop-confirms",
        "multisig/review.proposal",
        "multisig/review.is-confirmed",
      ],
      async queryFn({ id, user }) {
        const [confirmations, proposal, userConfirmed] = await Promise.all([
          queryContract("multisig/review.prop-confirms", { id }),
          queryContract("multisig/review.proposal", { id }),
          user
            ? queryContract("multisig/review.is-confirmed", {
                id,
                addr: user,
              })
            : false,
        ]);

        return { data: { ...proposal, confirmations, userConfirmed } };
      },
    }),
  }),
});

async function endowBalance(id: number): Promise<EndowBalance> {
  //TODO: query registrar
  const tokens: AcceptedTokens = {
    cw20: ["0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747"],
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
  useAdminResourcesQuery,
  useEndowBalanceQuery,
  useWithdrawDataQuery,
  useApplicationQuery,
} = customApi;

type Result<T> = { data: T } | { errors: unknown };
async function querySubgraph<T>(query: string): Promise<T> {
  return fetch("https://graphql.cosmwasm.com/v1/graphql", {
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
