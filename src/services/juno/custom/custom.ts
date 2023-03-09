import { Args } from "../queryContract/types";
import {
  AdminResources,
  EndowmentAssets,
  ProposalDetails,
} from "services/types";
import { condenseToNum, idParamToNum } from "helpers";
import { contracts } from "constants/contracts";
import { junoApi } from "..";
import { queryContract } from "../queryContract";
import { accountTags, adminTags, registrarTags } from "../tags";
import { apCWs, getMeta } from "./helpers/admin-resource";
import summarizer, { BalMap } from "./helpers/endow-assets";

export const customApi = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    isMember: builder.query<boolean, { user: string; endowmentId?: string }>({
      providesTags: [
        { type: "admin", id: adminTags.voter },
        { type: "account", id: accountTags.endowment },
      ],
      async queryFn(args) {
        const numId = idParamToNum(args.endowmentId);
        const AP = apCWs[numId];
        /** special case for ap admin usage */
        if (AP) {
          const { cw3 } = AP;
          //skip endowment query, query hardcoded cw3 straight
          const voter = await queryContract("cw3Voter", cw3, {
            addr: args.user,
          });
          return {
            data: !!voter.weight,
          };
        }

        const endowment = await queryContract(
          "accEndowment",
          contracts.accounts,
          { id: numId }
        );

        const voter = await queryContract("cw3Voter", endowment.owner, {
          addr: args.user,
        });

        return {
          data: !!voter.weight,
        };
      },
    }),
    adminResources: builder.query<
      AdminResources,
      { user?: string; endowmentId?: string }
    >({
      providesTags: [
        { type: "admin", id: adminTags.voter },
        { type: "admin", id: adminTags.voters },
        { type: "admin", id: adminTags.config },
        { type: "account", id: accountTags.endowment },
      ],
      async queryFn(args) {
        const numId = idParamToNum(args.endowmentId);
        const AP = apCWs[numId];
        /** special case for ap admin usage */
        if (AP) {
          const { cw3, cw4, type } = AP;
          //skip endowment query, query hardcoded cw3 straight

          const [meta, config] = await getMeta(numId, cw3, args.user);
          return {
            data: {
              type: type as any,
              id: numId,
              cw3,
              cw4,
              propMeta: meta,
              config,
            },
          };
        }

        const endowment = await queryContract(
          "accEndowment",
          contracts.accounts,
          { id: numId }
        );
        const [meta, config] = await getMeta(numId, endowment.owner, args.user);

        return {
          data: {
            type: "charity",
            id: numId,
            cw3: endowment.owner,
            cw4: config.group_addr,
            config,
            propMeta: meta,
            ...endowment,
          },
        };
      },
    }),
    proposalDetails: builder.query<
      ProposalDetails,
      { id?: string; cw3: string; voter: string }
    >({
      providesTags: [
        { type: "admin", id: adminTags.proposal },
        { type: "admin", id: adminTags.votes },
      ],
      async queryFn(args) {
        const id = Number(args.id);

        if (isNaN(id)) {
          return { error: undefined };
        }

        const [proposal, votesRes] = await Promise.all([
          queryContract("cw3Proposal", args.cw3, { id }),
          queryContract("cw3Votes", args.cw3, {
            proposal_id: id,
          }),
        ]);

        return {
          data: {
            ...proposal,
            votes: votesRes.votes,
          },
        };
      },
    }),
    assets: builder.query<
      EndowmentAssets,
      Args<"regVaultList"> & { endowId: number }
    >({
      providesTags: [
        "vault",
        { type: "registrar", id: registrarTags.vault_list },
        { type: "account", id: accountTags.state },
      ],
      async queryFn({ endowId, ...args }, api, extraOptions, baseQuery) {
        const [{ vaults }, accState] = await Promise.all([
          queryContract("regVaultList", contracts.registrar, args),
          queryContract("accState", contracts.accounts, { id: endowId }),
        ]);

        const vaultBals = await Promise.allSettled(
          vaults.map((v) =>
            queryContract("vaultBalance", v.address, {
              endowment_id: endowId,
            }).then((res) => ({ address: v.address, balance: res }))
          )
        );

        const { tokens_on_hand } = accState;
        const { native, cw20 } = tokens_on_hand[args.acct_type || "liquid"];
        const balMap: BalMap = [
          ...vaultBals.map((v) =>
            v.status === "fulfilled"
              ? [v.value.address, v.value.balance]
              : ["", ""]
          ),
          ...native.map((n) => [n.denom, n.amount]),
          ...cw20.map((c) => [c.address, c.amount]),
        ].reduce(
          (result, [vault, balance]) => ({
            ...result,
            [vault]: condenseToNum(balance),
          }),
          {}
        );

        const summarize = summarizer(vaults, balMap, tokens_on_hand);
        return {
          data: {
            liquid: summarize("liquid"),
            locked: summarize("locked"),
          },
        };
      },
    }),
  }),
});

export const {
  useIsMemberQuery,
  useAdminResourcesQuery,
  useProposalDetailsQuery,
  useAssetsQuery,
} = customApi;
