import { AdminResources, ProposalDetails } from "services/types";
import { SuccessLink } from "slices/transaction/types";
import {
  AdminVoteInfo,
  CW3Config,
  EndowmentDetails,
  InquiredMember,
  Proposal,
  QueryRes,
} from "types/server/contracts";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import { contracts } from "constants/contracts";
import { adminRoutes, appRoutes } from "constants/routes";
import { junoApi } from ".";
import contract_querier from "./contract_querier";
import { customTags, junoTags } from "./tags";

type VoteListRes = {
  votes: AdminVoteInfo[];
};

export const AP_ADDR = "ap-team";
export const customApi = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    isMember: builder.query<boolean, { user: string; endowmentId: string }>({
      providesTags: [{ type: junoTags.custom, id: customTags.isMember }],
      async queryFn(args, queryApi, extraOptions, baseQuery) {
        /** special case for ap admin usage */
        if (args.endowmentId === AP_ADDR) {
          //skip endowment query, query hardcoded cw3 straight
          const cw3 = new CW3(undefined, contracts.apCW3);
          //get voter info of wallet addr
          const voterRes = await baseQuery(
            contract_querier(cw3.voter(args.user))
          );
          const voter = (voterRes.data as QueryRes<InquiredMember>).data;
          return {
            data: !!voter.weight,
          };
        }

        const account = new Account(undefined);
        //get endowment details
        const endowmentRes = await baseQuery(
          contract_querier(account.endowment(Number(args.endowmentId)))
        );

        const endowment = (endowmentRes.data as QueryRes<EndowmentDetails>)
          .data;

        const cw3 = new CW3(undefined, endowment.owner);

        //get voter info of wallet addr
        const voterRes = await baseQuery(
          contract_querier(cw3.voter(args.user))
        );

        const voter = (voterRes.data as QueryRes<InquiredMember>).data;

        return {
          data: !!voter.weight,
        };
      },
    }),
    adminResources: builder.query<
      AdminResources | undefined,
      { user: string; endowmentId: string }
    >({
      providesTags: [{ type: junoTags.custom, id: customTags.adminResources }],
      async queryFn(args, queryApi, extraOptions, baseQuery) {
        /** special case for ap admin usage */
        const proposalLink: SuccessLink = {
          url: `${appRoutes.admin}/${args.endowmentId}/${adminRoutes.proposals}`,
          description: "Go to proposals",
        };

        if (args.endowmentId === AP_ADDR) {
          //skip endowment query, query hardcoded cw3 straight
          const cw3 = new CW3(undefined, contracts.apCW3);

          const voterRes = await baseQuery(
            contract_querier(cw3.voter(args.user))
          );

          const voter = (voterRes.data as QueryRes<InquiredMember>).data;

          if (!!voter.weight) {
            const configRes = await baseQuery(contract_querier(cw3.config));
            const cw3config = (configRes.data as QueryRes<CW3Config>).data;

            return {
              data: {
                cw3: contracts.apCW3,
                cw4: contracts.apCW4,
                endowmentId: AP_ADDR,
                cw3config,
                proposalLink,
                isAp: true,
              },
            };
          } else {
            return { data: undefined };
          }
        }

        const account = new Account(undefined);
        //get endowment details
        const endowmentRes = await baseQuery(
          contract_querier(account.endowment(Number(args.endowmentId)))
        );
        const endowment = (endowmentRes.data as QueryRes<EndowmentDetails>)
          .data;

        const cw3 = new CW3(undefined, endowment.owner);

        const voterRes = await baseQuery(
          contract_querier(cw3.voter(args.user))
        );

        const voter = (voterRes.data as QueryRes<InquiredMember>).data;

        if (!!voter.weight) {
          const configRes = await baseQuery(contract_querier(cw3.config));
          //get cw3Config
          const cw3config = (configRes.data as QueryRes<CW3Config>).data;
          return {
            data: {
              cw3: endowment.owner,
              cw4: cw3config.group_addr,
              endowmentId: args.endowmentId,
              cw3config,
              proposalLink,
              isAp: false,
            },
          };
        }
        //if wallet is now owner, don't return anything
        return { data: undefined };

        //query is member
      },
    }),
    proposalDetails: builder.query<
      ProposalDetails | undefined,
      { id?: string; cw3: string; voter: string }
    >({
      providesTags: [{ type: junoTags.custom, id: customTags.proposalDetails }],
      async queryFn(args, queryApi, extraOptions, baseQuery) {
        const id = Number(args.id);

        if (isNaN(id)) {
          return { data: undefined };
        }

        const cw3 = new CW3(undefined, args.cw3);

        const proposalRes = await baseQuery(contract_querier(cw3.proposal(id)));
        const proposal = (proposalRes.data as QueryRes<Proposal>).data;

        const votesRes = await baseQuery(
          contract_querier(cw3.votes({ proposal_id: id }))
        );

        const votes = (votesRes.data as QueryRes<VoteListRes>).data.votes;

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
