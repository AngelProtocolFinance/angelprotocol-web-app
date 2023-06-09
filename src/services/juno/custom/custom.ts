import {
  AdminResources,
  EndowBalance,
  IERC20,
  ProposalDetails,
} from "services/types";
import { AcceptedTokens, AccountType } from "types/contracts";
import { Transaction } from "types/contracts/multisig";
import { TransactionStatus } from "types/lists";
import { idParamToNum } from "helpers";
import { junoApi } from "..";
import { queryContract } from "../queryContract";
import { apCWs, getMeta } from "./helpers/admin-resource";

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
      { user?: string; endowmentId?: string }
    >({
      providesTags: [
        "multisig.members",
        "multisig.threshold",
        "accounts.endowment",
      ],
      async queryFn(args) {
        const numId = idParamToNum(args.endowmentId);
        const AP = apCWs[numId];
        /** special case for ap admin usage */
        if (AP) {
          const { multisig, type } = AP;
          //skip endowment query, query hardcoded cw3 straight

          const [meta, config, members] = await getMeta(
            numId,
            multisig,
            args.user
          );

          return {
            data: {
              type: type as any,
              id: numId,
              members,
              multisig,
              propMeta: meta,
              config,
            },
          };
        }

        const endowment = await queryContract("accounts.endowment", {
          id: numId,
        });

        const [meta, config, members] = await getMeta(
          numId,
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
            propMeta: meta,
            ...endowment,
          },
        };
      },
    }),
    proposalDetails: builder.query<
      ProposalDetails,
      { id?: string; multisig: string }
    >({
      providesTags: [
        "multisig.votes",
        "multisig.members",
        "multisig.transaction",
      ],
      async queryFn({ id: idParam, multisig }) {
        const id = idParamToNum(idParam);

        const [signed, signers, transaction] = await Promise.all([
          queryContract("multisig.votes", {
            multisig,
            id,
          }),
          queryContract("multisig.members", { multisig }),
          queryContract("multisig.transaction", { multisig, id }),
        ]);

        return {
          data: {
            ...transaction,
            signed,
            signers,
          },
        };
      },
    }),
    endowBalance: builder.query<EndowBalance, { id: number }>({
      providesTags: ["accounts.token-balance"],
      async queryFn(args) {
        //TODO: get this from registrar
        const tokens: AcceptedTokens = {
          cw20: ["0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747"],
        };

        const balances = (type: AccountType) =>
          Promise.all(
            tokens.cw20.map((t) =>
              queryContract("accounts.token-balance", {
                id: args.id,
                accounType: type,
                token: t,
              }).then<IERC20>((b) => ({
                address: t,
                amount: b,
              }))
            )
          );

        const [locked, liquid] = await Promise.all([balances(0), balances(1)]);

        return {
          data: { liquid, locked },
        };
      },
    }),
    proposals: builder.query<
      { proposals: Transaction[]; next?: number },
      { multisig: string; status: TransactionStatus; page: number }
    >({
      providesTags: ["multisig.tx-count", "multisig.txs"],
      async queryFn(args) {
        const { status, multisig, page } = args;
        const proposalsPerPage = 5;

        const count = await queryContract("multisig.tx-count", {
          multisig,
          open: status === "open",
          approved: status === "approved",
        });

        //get last 5 proposals
        const range: [number, number] = [
          Math.max(0, count - proposalsPerPage * args.page),
          count,
        ];

        const txs = await queryContract("multisig.txs", {
          multisig,
          range,
          status,
        });

        const details = await Promise.all(
          txs.map((t) =>
            queryContract("multisig.transaction", { multisig, id: t.id }).then(
              (t) => ({ ...t, id: t.id })
            )
          )
        );

        details.sort((a, b) => b.id - a.id);

        return {
          data: {
            proposals: details,
            next: range[0] > 0 ? page + 1 : undefined,
          },
        };
      },
    }),
  }),
});

export const {
  useIsMemberQuery,
  useProposalsQuery,
  useAdminResourcesQuery,
  useProposalDetailsQuery,
  useEndowBalanceQuery,
} = customApi;
