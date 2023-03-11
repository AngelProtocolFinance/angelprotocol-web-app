import { AdminResources, ProposalDetails } from "services/types";
import { idParamToNum } from "helpers";
import { contracts } from "constants/contracts";
import { junoApi } from "..";
import { queryContract } from "../queryContract";
import { accountTags, adminTags } from "../tags";
import { apCWs, getMeta } from "./helpers/admin-resource";

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
  }),
});

export const {
  useIsMemberQuery,
  useAdminResourcesQuery,
  useProposalDetailsQuery,
} = customApi;
