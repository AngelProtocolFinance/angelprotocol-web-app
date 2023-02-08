import { Args } from "./queryContract/types";
import { AdminResources, ProposalDetails, Vault } from "services/types";
import { CW3Config } from "types/contracts";
import { condenseToNum, idParamToNum } from "helpers";
import { isJunoAddress } from "schemas/tests";
import { contracts } from "constants/contracts";
import { adminRoutes, appRoutes } from "constants/routes";
import { junoApi } from ".";
import { queryContract } from "./queryContract";
import {
  accountTags,
  adminTags,
  defaultProposalTags,
  registrarTags,
} from "./tags";

export const customApi = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    isMember: builder.query<boolean, { user: string; endowmentId?: string }>({
      providesTags: [
        { type: "admin", id: adminTags.voter },
        { type: "account", id: accountTags.endowment },
      ],
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
        /** special case for ap admin usage */
        if (isAp(numId)) {
          const { cw3, cw4, type } = getCWs(numId);
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
    vaults: builder.query<Vault[], Args<"regVaultList"> & { endowId: number }>({
      providesTags: [
        { type: "registrar", id: registrarTags.vault_list },
        { type: "account", id: accountTags.balance },
      ],
      async queryFn({ endowId, ...args }, api, extraOptions, baseQuery) {
        const [vaultsRes, balances] = await Promise.all([
          queryContract("regVaultList", contracts.registrar, args),
          queryContract("accBalance", contracts.accounts, { id: endowId }),
        ]);

        const { invested_liquid, invested_locked } = balances;
        const balMap: { [index: string]: number | undefined } = invested_liquid
          .concat(invested_locked)
          .reduce(
            (result, [vault, balance]) => ({
              ...result,
              [vault]: condenseToNum(balance),
            }),
            {}
          );

        return {
          data: vaultsRes.vaults.map((v) => ({
            ...v,
            balance: balMap[v.address] || 0,
          })),
        };
      },
    }),
  }),
});

export const {
  useIsMemberQuery,
  useAdminResourcesQuery,
  useProposalDetailsQuery,
  useVaultsQuery,
} = customApi;

export const AP_ID = 0;
export const REVIEWER_ID = 0.5;

function getCWs(id: number) {
  //TODO: atm, only two admin types, refactor this once > 2
  //charities doesn't have hardcoded cws, so only test for AP_ID && REVIEWER_ID
  const cw3 = id === AP_ID ? contracts.cw3ApTeam : contracts.cw3ReviewTeam;
  const cw4 =
    id === AP_ID ? contracts.cw4GrpApTeam : contracts.cw4GrpReviewTeam;
  const type: AdminResources["type"] = id === AP_ID ? "ap" : "review";
  return { cw3, cw4, type };
}

function isAp(id: number) {
  return id === AP_ID || id === REVIEWER_ID;
}

async function getMeta(
  endowId: number,
  cw3: string,
  user?: string
): Promise<[AdminResources["propMeta"], CW3Config]> {
  const [votersRes, config, voter] = await Promise.all([
    queryContract("cw3ListVoters", cw3, null),
    queryContract("cw3Config", cw3, null),
    /** just set credential to none, if disconnected or non-juno wallet */
    user && isJunoAddress(user)
      ? queryContract("cw3Voter", cw3, {
          addr: user,
        })
      : Promise.resolve({ weight: 0 }),
  ]);

  const numVoters = votersRes.voters.length;

  const willExecute =
    /** single member */
    numVoters === 1 ||
    /** multiple members but threshold is lte 1/members given that execution is not required */
    (!config.require_execution &&
      Number(config.threshold.absolute_percentage.percentage) <= 1 / numVoters);

  const tagPayloads = [customApi.util.invalidateTags(defaultProposalTags)];

  const meta = willExecute
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
        isAuthorized: !!voter.weight,
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
        isAuthorized: !!voter.weight,
      };

  return [meta, config];
}
