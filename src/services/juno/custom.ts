import { AdminResources, ProposalDetails } from "services/types";
import { SuccessLink } from "slices/transaction/types";
import { contracts } from "constants/contracts";
import { adminRoutes, appRoutes } from "constants/routes";
import { junoApi } from ".";
import { queryContract } from "./queryContract";
import { customTags, junoTags } from "./tags";

export const AP_ADDR = "ap-team";
export const customApi = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    isMember: builder.query<boolean, { user: string; endowment: string }>({
      providesTags: [{ type: junoTags.custom, id: customTags.isMember }],
      async queryFn(args) {
        /** special case for ap admin usage */
        if (args.endowment === AP_ADDR) {
          //skip endowment query, query hardcoded cw3 straight
          const voter = await queryContract("cw3Voter", contracts.apCW3, {
            addr: args.user,
          });
          return {
            data: !!voter.weight,
          };
        }

        const endowment = await queryContract(
          "accEndowment",
          args.endowment,
          null
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
      AdminResources | undefined,
      { user: string; endowment: string }
    >({
      providesTags: [{ type: junoTags.custom, id: customTags.adminResources }],
      async queryFn(args, queryApi, extraOptions, baseQuery) {
        /** special case for ap admin usage */
        const proposalLink: SuccessLink = {
          url: `${appRoutes.admin}/${args.endowment}/${adminRoutes.proposals}`,
          description: "Go to proposals",
        };

        if (args.endowment === AP_ADDR) {
          //skip endowment query, query hardcoded cw3 straight
          const voter = await queryContract("cw3Voter", contracts.apCW3, {
            addr: args.user,
          });

          if (!!voter.weight) {
            const cw3config = await queryContract(
              "cw3Config",
              contracts.apCW3,
              null
            );

            return {
              data: {
                cw3: contracts.apCW3,
                cw4: contracts.apCW4,
                endowment: AP_ADDR,
                cw3config,
                proposalLink,
                isAp: true,
              },
            };
          } else {
            return { data: undefined };
          }
        }

        //get endowment details
        const endowment = await queryContract(
          "accEndowment",
          args.endowment,
          null
        );

        const voter = await queryContract("cw3Voter", endowment.owner, {
          addr: args.user,
        });

        if (!!voter.weight) {
          const cw3config = await queryContract(
            "cw3Config",
            endowment.owner,
            null
          );
          return {
            data: {
              cw3: endowment.owner,
              cw4: cw3config.group_addr,
              endowment: args.endowment,
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
      async queryFn(args) {
        const id = Number(args.id);

        if (isNaN(id)) {
          return { data: undefined };
        }

        const proposal = await queryContract("cw3Proposal", args.cw3, { id });
        const votesRes = await queryContract("cw3Votes", args.cw3, {
          proposal_id: id,
        });

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
