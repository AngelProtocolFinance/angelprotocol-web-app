import { ConnectedWallet } from "@terra-money/wallet-provider";
import {
  MsgExecuteContract,
  // Coin,
  Dec,
  CreateTxOptions,
  // StdFee,
} from "@terra-money/terra.js";
import { contracts } from "constants/contracts";
import Contract from "./Contract";
import { PollExecuteMsg, sc, Vote } from "./types";
// import { denoms } from "constants/currency";

export default class Halo extends Contract {
  token_address: string;
  gov_address: string;

  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.token_address = contracts[this.chainID][sc.halo_token];
    this.gov_address = contracts[this.chainID][sc.halo_gov];
  }

  //halo_token
  async createGovStakeTx(amount: number): Promise<CreateTxOptions> {
    this.checkWallet();
    const uhalo = new Dec(amount).mul(1e6).toInt();
    const stake_msg = new MsgExecuteContract(
      this.walletAddr!,
      this.token_address,
      {
        send: {
          amount: uhalo.toString(),
          contract: this.gov_address,
          msg: btoa(JSON.stringify({ stake_voting_tokens: {} })),
        },
      }
    );
    const fee = await this.estimateFee([stake_msg]);
    // const fee = new StdFee(2500000, [new Coin(denoms.uusd, 1.5e6)]);
    return { msgs: [stake_msg], fee };
  }

  async createPoll(
    amount: number,
    title: string,
    description: string,
    link?: string,
    msgs?: PollExecuteMsg[]
  ) {
    this.checkWallet();
    const u_amount = new Dec(amount).mul(1e6).toInt();
    const poll_msg = new MsgExecuteContract(
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
    const fee = await this.estimateFee([poll_msg]);
    // const fee = new StdFee(2500000, [new Coin(denoms.uusd, 1.5e6)]);
    return { msgs: [poll_msg], fee };
  }

  //halo_gov
  async createEndPollTx(poll_id: string) {
    this.checkWallet();
    const poll_msg = new MsgExecuteContract(
      this.walletAddr!,
      this.gov_address,
      { end_poll: { poll_id: +poll_id } }
    );
    const fee = await this.estimateFee([poll_msg]);
    return { msgs: [poll_msg], fee };
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

  async createVoteTx(poll_id: string, vote: Vote, amount: number) {
    this.checkWallet();
    const uhalo = new Dec(amount).mul(1e6).toInt();
    const vote_msg = new MsgExecuteContract(
      this.walletAddr!,
      this.gov_address,
      {
        cast_vote: { poll_id: +poll_id, vote, amount: uhalo.toString() },
      }
    );
    const fee = await this.estimateFee([vote_msg]);
    return { msgs: [vote_msg], fee };
  }
}
