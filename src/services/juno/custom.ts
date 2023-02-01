import { Account, EndowmentResource, ProposalDetails } from "services/types";
import { CW3Config } from "types/contracts";
import { idParamToNum } from "helpers";
import { contracts } from "constants/contracts";
import { adminRoutes, appRoutes } from "constants/routes";
import { junoApi } from ".";
import { queryContract } from "./queryContract";
import { customTags, defaultProposalTags } from "./tags";

export const customApi = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    isMember: builder.query<boolean, { user: string; endowmentId?: string }>({
      providesTags: [{ type: "custom", id: customTags.isMember }],
      async queryFn(args) {
        const numId = idParamToNum(args.endowmentId);
        /** special case for ap admin usage */
        if (isAp(numId)) {
          const { cw3 } = getCWs(numId);
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
      EndowmentResource,
      { user?: string; endowmentId?: string }
    >({
      providesTags: [{ type: "custom", id: customTags.adminResources }],
      async queryFn(args) {
        const numId = idParamToNum(args.endowmentId);
        /** special case for ap admin usage */
        if (isAp(numId)) {
          const { cw3, cw4, type } = getCWs(numId);
          //skip endowment query, query hardcoded cw3 straight
          const [voter, config] = await Promise.all([
            args.user
              ? queryContract("cw3Voter", cw3, {
                  addr: args.user,
                })
              : Promise.resolve({ weight: 0 }),
            queryContract("cw3Config", cw3, null),
          ]);

          return {
            data: {
              type: type as any,
              id: numId,
              cw3,
              cw4,
              isUserMember: !!voter.weight,
              propMeta: await getPropMeta(numId, cw3, config),
              config,
            },
          };
        }

        const [endowment, balances] = await Promise.all([
          queryContract("accEndowment", contracts.accounts, { id: numId }),
          queryContract("accBalance", contracts.accounts, { id: numId }),
        ]);

        const [voter, config] = await Promise.all([
          args.user
            ? queryContract("cw3Voter", endowment.owner, {
                addr: args.user,
              })
            : Promise.resolve({ weight: 0 }),
          queryContract("cw3Config", endowment.owner, null),
        ]);

        //format balances and endowment to type CharityResource["details"]
        const liquid: Account = {
          strats: endowment.strategies.liquid,
          one_offs: endowment.oneoff_vaults.liquid,
          balance: balances.tokens_on_hand.liquid,
          investments: balances.invested_liquid,
        };

        const locked: Account = {
          strats: endowment.strategies.locked,
          one_offs: endowment.oneoff_vaults.locked,
          balance: balances.tokens_on_hand.locked,
          investments: balances.invested_locked,
        };

        return {
          data: {
            type: "charity",
            id: numId,
            cw3: endowment.owner,
            cw4: config.group_addr,
            isUserMember: !!voter.weight,
            details: { ...endowment, liquid, locked },
            config,
            propMeta: await getPropMeta(numId, endowment.owner, config),
          },
        };
      },
    }),
    proposalDetails: builder.query<
      ProposalDetails,
      { id?: string; cw3: string; voter: string }
    >({
      providesTags: [{ type: "custom", id: customTags.proposalDetails }],
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

export const AP_ID = 0;
export const REVIEWER_ID = 0.5;

function getCWs(id: number) {
  //TODO: atm, only two admin types, refactor this once > 2
  //charities doesn't have hardcoded cws, so only test for AP_ID && REVIEWER_ID
  const cw3 = id === AP_ID ? contracts.cw3ApTeam : contracts.cw3ReviewTeam;
  const cw4 =
    id === AP_ID ? contracts.cw4GrpApTeam : contracts.cw4GrpReviewTeam;
  const type: EndowmentResource["type"] = id === AP_ID ? "ap" : "review";
  return { cw3, cw4, type };
}

function isAp(id: number) {
  return id === AP_ID || id === REVIEWER_ID;
}

async function getPropMeta(
  endowId: number,
  cw3: string,
  config: CW3Config
): Promise<EndowmentResource["propMeta"]> {
  const votersRes = await queryContract("cw3ListVoters", cw3, null);
  const numVoters = votersRes.voters.length;

  const willExecute =
    /** single member */
    numVoters === 1 ||
    /** multiple members but threshold is lte 1/members given that execution is not required */
    (!config.require_execution &&
      Number(config.threshold.absolute_percentage.percentage) <= 1 / numVoters);

  const tagPayloads = [customApi.util.invalidateTags(defaultProposalTags)];

  return willExecute
    ? {
        willExecute,
        successMeta: {
          message: "Successful transaction",
          link: {
            url: `${appRoutes.admin}/${endowId}`,
            description: "Go to admin home",
          },
        },
        tagPayloads,
      }
    : {
        willExecute: undefined,
        successMeta: {
          message: "Proposal successfully created",
          link: {
            url: `${appRoutes.admin}/${endowId}/${adminRoutes.proposals}`,
            description: "Go to proposals",
          },
        },
        tagPayloads,
      };
}
