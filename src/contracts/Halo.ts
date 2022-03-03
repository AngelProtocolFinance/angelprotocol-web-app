import { ConnectedWallet } from "@terra-money/wallet-provider";
import {
  MsgExecuteContract,
  // Coin,
  Dec,
  CreateTxOptions,
  // StdFee,
} from "@terra-money/terra.js";
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

  async getGovState() {
    return this.query<GovState>(this.gov_address, this.gov_state.msg);
  }

  //halo_token
  async createGovStakeTx(amount: number): Promise<CreateTxOptions> {
    this.checkWallet();
    const stake_msg = this.createGovStakeMsg(amount);
    const fee = await this.estimateFee([stake_msg]);
    // const fee = new StdFee(2500000, [new Coin(denoms.uusd, 1.5e6)]);
    return { msgs: [stake_msg], fee };
  }

  async createGovClaimTx(): Promise<CreateTxOptions> {
    this.checkWallet();
    const claim_msg = new MsgExecuteContract(
      this.walletAddr!,
      this.gov_address,
      { claim_voting_tokens: {} }
    );
    const fee = await this.estimateFee([claim_msg]);
    return { msgs: [claim_msg], fee };
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
  createEndPollMsg(poll_id: number) {
    this.checkWallet();
    return new MsgExecuteContract(this.walletAddr!, this.gov_address, {
      end_poll: { poll_id: poll_id },
    });
  }

  async createGovUnstakeTx(amount: number): Promise<CreateTxOptions> {
    this.checkWallet();
    const uhalo = new Dec(amount).mul(1e6).toInt();
    const unstake_msg = new MsgExecuteContract(
      this.walletAddr!,
      this.gov_address,
      { withdraw_voting_tokens: { amount: uhalo.toString() } }
    );
    const fee = await this.estimateFee([unstake_msg]);
    return { msgs: [unstake_msg], fee };
  }

  async createVoteTx(poll_id: number, vote: Vote, amount: number) {
    this.checkWallet();
    const uhalo = new Dec(amount).mul(1e6).toInt();
    const vote_msg = new MsgExecuteContract(
      this.walletAddr!,
      this.gov_address,
      {
        cast_vote: { poll_id, vote, amount: uhalo.toString() },
      }
    );
    const fee = await this.estimateFee([vote_msg]);
    return { msgs: [vote_msg], fee };
  }

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
