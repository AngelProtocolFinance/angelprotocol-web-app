import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import {
  AdminVoteInfo,
  AllianceMember,
  CW3Config,
  CW3ListVoters,
  CW4Member,
  CW20Balance,
  CW20Info,
  EndowmentController,
  EndowmentDetails,
  EndowmentState,
  FundDetails,
  GenericBalance,
  GovConfig,
  GovStaker,
  GovState,
  IndexFundConfig,
  InquiredMember,
  Polls,
  Proposal,
  QueryRes as QR,
  RegistrarConfig,
  RegistrarConfigExtension,
} from "types/contracts";

export const cosmosQueries: {
  [K in QT]: Q[K]["args"] extends null
    ? [object, Q[K]["transform"]]
    : [(args: Q[K]["args"]) => object, Q[K]["transform"]];
} = {
  /** registrar */
  "registrar.config": [{ config: {} }, (res: QR<RegistrarConfig>) => res.data],
  "registrar.config-extension": [
    { config_extension: {} },
    (res: QR<RegistrarConfigExtension>) => res.data,
  ],

  /** index fund */
  "index-fund.funds": [
    { funds_list: {} },
    (res: QR<{ funds: FundDetails[] }>) => res.data.funds,
  ],
  "index-fund.alliance-members": [
    { alliance_members: {} },
    (res: QR<{ alliance_members: AllianceMember[] }>) =>
      res.data.alliance_members,
  ],
  "index-fund.config": [{ config: {} }, (res: QR<IndexFundConfig>) => res.data],

  /** gov */
  "gov.staker": [
    ({ addr }) => ({
      staker: { address: addr },
    }),
    (res: QR<GovStaker>) => res.data,
  ],
  "gov.state": [{ state: {} }, (res: QR<GovState>) => res.data],
  "gov.config": [{ config: {} }, (res: QR<GovConfig>) => res.data],
  "gov.polls": [{ polls: {} }, (res: QR<Polls>) => res.data.polls],

  /** cw20 */
  "cw20.info": [{}, (res: QR<CW20Info>) => res.data],
  "cw20.balance": [
    ({ addr }) => ({
      balance: { address: addr },
    }),
    (res: QR<CW20Balance>) => res.data,
  ],

  /** giftcard */
  "gift-card.balance": [
    ({ addr }) => ({
      balance: { address: addr },
    }),
    (res: QR<GenericBalance>) => res.data,
  ],

  /** cw4 member */
  "cw4.members": [
    { list_members: {} },
    (res: QR<{ members: CW4Member[] }>) => res.data.members,
  ],
  "cw4.member": [
    ({ addr }) => ({
      member: { addr },
    }),
    (res: QR<InquiredMember>) => res.data,
  ],

  /** cw3 voter */
  "cw3.voter": [
    ({ addr }) => ({
      voter: { address: addr },
    }),
    (res: QR<InquiredMember>) => res.data,
  ],

  "cw3.voters": [
    { list_voters: {} },
    (res: QR<CW3ListVoters>) => res.data.voters,
  ],
  "cw3.config": [{ config: {} }, (res: QR<CW3Config>) => res.data],
  "cw3.proposals": [
    (options) => ({
      reverse_proposals: options,
    }),
    (res: QR<{ proposals: Proposal[] }>) => res.data.proposals,
  ],
  "cw3.proposal": [
    ({ id }) => ({
      proposal: { proposal_id: id },
    }),
    (res: QR<Proposal>) => res.data,
  ],

  "cw3.votes": [
    (options) => ({
      list_votes: options,
    }),
    (res: QR<{ votes: AdminVoteInfo[] }>) => res.data.votes,
  ],

  /** account */
  "accounts.endowment": [
    ({ id }) => ({
      endowment: { id },
    }),
    (res: QR<EndowmentDetails>) => res.data,
  ],
  "accounts.state": [
    ({ id }) => ({ state: { id } }),
    (res: QR<EndowmentState>) => res.data,
  ],

  /** (account) settings controller */
  "accounts/settings.controller": [
    ({ id }) => ({ endowment_controller: { id } }),
    (res: QR<EndowmentController>) => res.data,
  ],
};
