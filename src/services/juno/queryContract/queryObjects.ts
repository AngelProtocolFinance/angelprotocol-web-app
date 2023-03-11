import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";

export const queryObject: {
  [K in QT]: Q[K]["args"] extends null
    ? object
    : (args: Q[K]["args"]) => object;
} = {
  /** registrar */
  regConfig: { config: {} },

  /**
   *  async getFundDetails(fundId: number) {
    const fundDetailsRes = await this.query<{ fund: FundDetails }>(
      IndexFund.address,
      {
        fund_details: { fund_id: fundId },
      }
    );
    return fundDetailsRes.fund;
  }
   */

  /** index fund */
  ifFund(args) {
    return { fund_details: args };
  },
  ifFunds: { funds_list: {} },
  ifAlliance: { alliance_members: {} },
  ifConfig: { config: {} },

  /** gov */
  govStaker({ addr }) {
    return { staker: { address: addr } };
  },
  govState: { state: {} },
  govConfig: { config: {} },
  govPolls: { polls: {} },

  /** cw20 */
  cw20Info: {},
  cw20Balance({ addr }) {
    return { balance: { address: addr } };
  },

  /** giftcard */
  giftcardBalance({ addr }) {
    return { Balance: { address: addr } };
  },

  /** cw4 member */
  cw4Members: { list_members: {} },
  cw4Member({ addr }) {
    return { member: { addr } };
  },

  /** cw3 voter */
  cw3Voter({ addr }) {
    return { voter: { address: addr } };
  },
  cw3ListVoters: { list_voters: {} },
  cw3Config: { config: {} },
  reviewCw3Config: { config: {} },
  cw3Proposals(options) {
    return { reverse_proposals: options };
  },
  cw3Proposal({ id }) {
    return { proposal: { proposal_id: id } };
  },
  cw3Votes(options) {
    return { list_votes: options };
  },

  /** airdrop */
  airdropIsClaimed({ stage, addr }) {
    return { is_claimed: { stage, address: addr } };
  },

  /** lp */
  lpSimul: {
    simulation: {
      offer_asset: {
        info: {
          native_token: {
            denom: "juno", //FUTURE: get from args
          },
        },
        amount: "1000000", //FUTURE: get from args
      },
      block_time: Math.round(new Date().getTime() / 1000 + 10),
    },
  },

  /** account */
  accEndowment({ id }) {
    return { endowment: { id } };
  },
  accState({ id }) {
    return { state: { id } };
  },

  /** vault */
  vaultBalance({ endowment_id }) {
    return { balance: { endowment_id } };
  },
};
