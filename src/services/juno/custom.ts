import { AdminResources, ProposalDetails } from "services/types";
import { SuccessLink } from "slices/transaction/types";
import idParamToNum from "helpers/idParamToNum";
import { contracts } from "constants/contracts";
import { adminRoutes, appRoutes } from "constants/routes";
import { junoApi } from ".";
import { queryContract } from "./queryContract";
import { customTags, junoTags } from "./tags";

export const AP_ID = 0;
export const REVIEWER_ID = 0.5;

function getCWs(id: number) {
  const cw3Addr = id === AP_ID ? contracts.cw3ApTeam : contracts.cw3ReviewTeam;
  const cw4Addr = id === AP_ID ? contracts.cw3ApTeam : contracts.cw3ReviewTeam;
  return { cw3Addr, cw4Addr };
}
function isAp(id: number) {
  return id === AP_ID || id === REVIEWER_ID;
}

export const customApi = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    isMember: builder.query<boolean, { user: string; endowmentId?: string }>({
      providesTags: [{ type: junoTags.custom, id: customTags.isMember }],
      async queryFn(args) {
        const numId = idParamToNum(args.endowmentId);
        /** special case for ap admin usage */
        if (isAp(numId)) {
          const { cw3Addr } = getCWs(numId);
          //skip endowment query, query hardcoded cw3 straight
          const voter = await queryContract("cw3Voter", cw3Addr, {
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
      AdminResources | undefined,
      { user: string; endowmentId?: string }
    >({
      providesTags: [{ type: junoTags.custom, id: customTags.adminResources }],
      async queryFn(args) {
        const numId = idParamToNum(args.endowmentId);
        /** special case for ap admin usage */
        const proposalLink: SuccessLink = {
          url: `${appRoutes.admin}/${args.endowmentId}/${adminRoutes.proposals}`,
          description: "Go to proposals",
        };

        if (isAp(numId)) {
          const { cw3Addr, cw4Addr } = getCWs(numId);
          //skip endowment query, query hardcoded cw3 straight
          const voter = await queryContract("cw3Voter", cw3Addr, {
            addr: args.user,
          });

          if (!!voter.weight) {
            const cw3config = await queryContract("cw3Config", cw3Addr, null);

            return {
              data: {
                cw3: cw3Addr,
                cw4: cw4Addr,
                endowmentId: numId,
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
          contracts.accounts,
          { id: numId }
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
              endowmentId: numId,
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
