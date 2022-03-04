import { ConnectedWallet } from "@terra-money/wallet-provider";
import { MsgExecuteContract, Dec } from "@terra-money/terra.js";
import { contracts } from "constants/contracts";
import { sc } from "constants/sc";
import Contract from "./Contract";
import { Vote } from "./types";
import { GovState } from "services/terra/gov/types";
import { ContractQueryArgs } from "services/terra/types";
import { Airdrops } from "services/aws/airdrop/types";
// import { denoms } from "constants/currency";

export default class Halo extends Contract {
  airdrop_addr: string;
  token_address: string;
  gov_address: string;
  staker: ContractQueryArgs;
  gov_balance: ContractQueryArgs;
  gov_state: ContractQueryArgs;
  polls: ContractQueryArgs;

  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.token_address = contracts[this.chainID][sc.halo_token];
    this.gov_address = contracts[this.chainID][sc.halo_gov];
    this.airdrop_addr = contracts[this.chainID][sc.airdrop];

    //query args
    this.staker = {
      address: this.gov_address,
      msg: { staker: { address: wallet?.walletAddress } },
    };

    this.gov_balance = {
      address: this.token_address,
      msg: { balance: { address: this.gov_address } },
    };

    this.gov_state = {
      address: this.gov_address,
      msg: { state: {} },
    };

    this.polls = {
      address: this.gov_address,
      msg: { polls: {} },
    };
  }

  async getGovState() {
    return this.query<GovState>(this.gov_address, this.gov_state.msg);
  }

  //halo_token
  createGovStakeMsg(amount: number | string): MsgExecuteContract {
    this.checkWallet();
    const uhalo = new Dec(amount).mul(1e6).toInt();
    return new MsgExecuteContract(this.walletAddr!, this.token_address, {
      send: {
        amount: uhalo.toString(),
        contract: this.gov_address,
        msg: btoa(JSON.stringify({ stake_voting_tokens: {} })),
      },
    });
  }

  async createPollMsgs(
    amount: number,
    title: string,
    description: string,
    link?: string
    // msgs?: PollExecuteMsg[]
  ) {
    this.checkWallet();
    const u_amount = new Dec(amount).mul(1e6).toInt();
    const pollMsgs: MsgExecuteContract[] = [];
    const createPollMsg = new MsgExecuteContract(
      this.walletAddr!,
      this.token_address,
      {
        send: {
          amount: u_amount.toString(),
          contract: this.gov_address,
          msg: btoa(
            JSON.stringify({ create_poll: { title, description, link } })
          ),
        },
      }
    );

    const govState = await this.getGovState();
    const snapShotMsg = new MsgExecuteContract(
      this.walletAddr!,
      this.gov_address,
      {
        snapshot_poll: { poll_id: govState.poll_count + 1 },
      }
    );

    pollMsgs.push(createPollMsg);
    pollMsgs.push(snapShotMsg);

    return pollMsgs;
  }

  //halo_gov
  createGovUnstakeMsg(amount: number) {
    this.checkWallet();
    const uhalo = new Dec(amount).mul(1e6).toInt();
    return new MsgExecuteContract(this.walletAddr!, this.gov_address, {
      withdraw_voting_tokens: { amount: uhalo.toString() },
    });
  }

  createGovClaimMsg() {
    this.checkWallet();
    return new MsgExecuteContract(this.walletAddr!, this.gov_address, {
      claim_voting_tokens: {},
    });
  }

  createEndPollMsg(poll_id: number) {
    this.checkWallet();
    return new MsgExecuteContract(this.walletAddr!, this.gov_address, {
      end_poll: { poll_id: poll_id },
    });
  }

  createVoteMsg(poll_id: number, vote: Vote, amount: number) {
    this.checkWallet();
    const uhalo = new Dec(amount).mul(1e6).toInt();
    return new MsgExecuteContract(this.walletAddr!, this.gov_address, {
      cast_vote: { poll_id, vote, amount: uhalo.toString() },
    });
  }

  //airdrop
  createAirdropClaimMsg(airdrops: Airdrops, is_stake = false) {
    this.checkWallet();
    const claimMsgs = airdrops.map(
      ({ stage, haloTokens, proof }) =>
        new MsgExecuteContract(this.walletAddr!, this.airdrop_addr, {
          claim: { stage, amount: haloTokens, proof },
        })
    );

    if (is_stake) {
      const totalClaimable = airdrops.reduce(
        (result, airdrop) => new Dec(airdrop.haloTokens).div(1e6).add(result),
        new Dec(0)
      );
      const stake_msg = this.createGovStakeMsg(totalClaimable.toString());
      claimMsgs.push(stake_msg);
    }

    return claimMsgs;
  }
}
