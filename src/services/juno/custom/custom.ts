import { AdminResources, ProposalDetails } from "services/types";
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
            data: args.user in members,
          };
        }

        const endowment = await queryContract("accounts.endowment", {
          id: numId,
        });

        const members = await queryContract("multisig.members", {
          multisig: endowment.owner,
        });

        return {
          data: args.user in members,
        };
      },
    }),
    adminResources: builder.query<
      AdminResources,
      { user?: string; endowmentId?: string }
    >({
      providesTags: [
        "multisig.members",
        "multisig.config",
        "accounts.endowment",
      ],
      async queryFn(args) {
        const numId = idParamToNum(args.endowmentId);
        const AP = apCWs[numId];
        /** special case for ap admin usage */
        if (AP) {
          const { multisig, type } = AP;
          //skip endowment query, query hardcoded cw3 straight

          const [meta, config] = await getMeta(numId, multisig, args.user);

          return {
            data: {
              type: type as any,
              id: numId,
              multisig,
              propMeta: meta,
              config,
            },
          };
        }

        const endowment = await queryContract("accounts.endowment", {
          id: numId,
        });

        const [meta, config] = await getMeta(numId, endowment.owner, args.user);

        return {
          data: {
            type: "charity",
            id: numId,
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
      { id?: string; cw3: string }
    >({
      providesTags: ["multisig.proposal", "multisig.votes"],
      async queryFn(args) {
        const id = Number(args.id);

        if (isNaN(id)) {
          return { error: undefined };
        }

        const [proposal, votes] = await Promise.all([
          queryContract("multisig.proposal", { multisig: args.cw3, id }),
          queryContract("multisig.votes", {
            multisig: args.cw3,
            proposal_id: id,
          }),
        ]);

        return {
          data: {
            ...proposal,
            votes,
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
} = customApi;
