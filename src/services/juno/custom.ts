import { utils } from "ethers";
import { Args, Res, Result } from "./queryContract/types";
import {
  AdminResources,
  AdminRoles,
  EndowmentInfo,
  ProposalDetails,
} from "services/types";
import { Token } from "types/aws";
import { CW3Config, EndowmentDetails } from "types/contracts";
import { idParamToNum } from "helpers";
import { UnexpectedStateError } from "errors/errors";
import { contracts } from "constants/contracts";
import { adminRoutes, appRoutes } from "constants/routes";
import { junoApi } from ".";
import { queryContract } from "./queryContract";
import { genQueryPath } from "./queryContract/genQueryPath";
import { customTags, defaultProposalTags, junoTags } from "./tags";

export const AP_ID = 0;
export const REVIEWER_ID = 0.5;

function getCWs(id: number) {
  //TODO: atm, only two admin types, refactor this once > 2
  //charities doesn't have hardcoded cws, so only test for AP_ID && REVIEWER_ID
  const cw3Addr = id === AP_ID ? contracts.cw3ApTeam : contracts.cw3ReviewTeam;
  const cw4Addr =
    id === REVIEWER_ID ? contracts.cw4GrpApTeam : contracts.cw4GrpReviewTeam;
  const role: AdminRoles = id === AP_ID ? "ap" : "reviewer";
  return { cw3Addr, cw4Addr, role };
}

function isAp(id: number) {
  return id === AP_ID || id === REVIEWER_ID;
}

async function getPropMeta(
  endowId: number,
  cw3: string,
  config: CW3Config
): Promise<AdminResources["propMeta"]> {
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
        successLink: {
          url: `${appRoutes.admin}/${endowId}`,
          description: "Go to admin home",
        },
        successMessage: "Successful transaction",
        tagPayloads,
      }
    : {
        willExecute: undefined,
        successLink: {
          url: `${appRoutes.admin}/${endowId}/${adminRoutes.proposals}`,
          description: "Go to proposals",
        },
        successMessage: "Proposal successfully created",
        tagPayloads,
      };
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

        if (isAp(numId)) {
          const { cw3Addr, cw4Addr, role } = getCWs(numId);
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
                endowment: {} as EndowmentDetails, //admin templates shoudn't access this
                cw3config,
                role,
                propMeta: await getPropMeta(numId, cw3Addr, cw3config),
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
              endowment,
              cw3config,
              role: "charity",
              propMeta: await getPropMeta(numId, endowment.owner, cw3config),
            },
          };
        }
        //if wallet is now owner, don't return anything
        return { data: undefined };

        //query is member
      },
    }),
    giftcardBalance: builder.query<
      Result<"giftcardBalance">,
      Args<"giftcardBalance"> & { supportedTokens: Token[] }
    >({
      providesTags: [{ type: junoTags.custom, id: customTags.giftcard }],
      query: (args) =>
        genQueryPath("giftcardBalance", args, contracts.gift_cards),
      transformResponse: (res: Res<"giftcardBalance">, _, args) => {
        function toToken(denom: string, amount: string) {
          const token = args.supportedTokens.find((t) => t.token_id === denom);

          if (!token) {
            throw new UnexpectedStateError(
              `Giftcard contains unsupported token: ${denom}`
            );
          }

          const result: Token = {
            ...token,
            balance: +utils.formatUnits(amount, token.decimals),
          };

          return result;
        }

        const balances: Token[] = res.data.cw20
          .map((cw20) => toToken(cw20.address, cw20.amount))
          .concat(
            res.data.native.map((native) =>
              toToken(native.denom, native.amount)
            )
          );

        return balances;
      },
    }),
    proposalDetails: builder.query<
      ProposalDetails,
      { id?: string; cw3: string; voter: string }
    >({
      providesTags: [{ type: junoTags.custom, id: customTags.proposalDetails }],
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
    endowInfo: builder.query<EndowmentInfo, number>({
      providesTags: [{ type: junoTags.custom, id: customTags.proposalDetails }],
      async queryFn(id) {
        const [profile, details] = await Promise.all([
          queryContract("accProfile", contracts.accounts, { id }),
          queryContract("accEndowment", contracts.accounts, { id }),
        ]);
        return {
          data: {
            ...profile,
            ...details,
            id,
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
  useEndowInfoQuery,
  useGiftcardBalanceQuery,
} = customApi;
