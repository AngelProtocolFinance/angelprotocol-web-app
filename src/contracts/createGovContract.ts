import { MsgExecuteContract } from "@terra-money/terra.js";
import Decimal from "decimal.js";
import { ContractQueryArgs } from "services/types";
import { Vote } from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { contracts } from "constants/contracts";
import { BaseContract } from "./createBaseContract";
import { createCW20Contract } from "./createCW20Contract";

const GOV_CONTRACT_ADDR = contracts.gov;
const HALO_CONTRACT_ADDR = contracts.halo_token;

export async function createGovContract(
  wallet?: WalletState
): Promise<GovContract> {
  const cw20Contract = await createCW20Contract(wallet, HALO_CONTRACT_ADDR);

  const walletAddress = wallet?.address || "";

  const staker = {
    address: GOV_CONTRACT_ADDR,
    msg: { staker: { address: walletAddress } },
  };

  const gov_state = {
    address: GOV_CONTRACT_ADDR,
    msg: { state: {} },
  };

  const config = {
    address: GOV_CONTRACT_ADDR,
    msg: { config: {} },
  };

  const polls = {
    address: GOV_CONTRACT_ADDR,
    msg: { polls: {} },
  };

  function createGovStakeMsg(amount: number | string): MsgExecuteContract {
    return cw20Contract.createSendMsg(amount, GOV_CONTRACT_ADDR, {
      stake_voting_tokens: {},
    });
  }

  function createPollMsgs(
    amount: number,
    title: string,
    description: string,
    link?: string
  ) {
    return cw20Contract.createSendMsg(amount, GOV_CONTRACT_ADDR, {
      _poll: { title, description, link },
    });
  }

  //halo_gov
  function createGovUnstakeMsg(amount: number) {
    const uhalo = new Decimal(amount).mul(1e6).divToInt(1);
    return new MsgExecuteContract(walletAddress, GOV_CONTRACT_ADDR, {
      withdraw_voting_tokens: { amount: uhalo.toString() },
    });
  }

  function createGovClaimMsg() {
    return new MsgExecuteContract(walletAddress, GOV_CONTRACT_ADDR, {
      claim_voting_tokens: {},
    });
  }

  function createEndPollMsg(poll_id: number) {
    return new MsgExecuteContract(walletAddress, GOV_CONTRACT_ADDR, {
      end_poll: { poll_id: poll_id },
    });
  }

  function createVoteMsg(poll_id: number, vote: Vote, amount: number) {
    const uhalo = new Decimal(amount).mul(1e6).divToInt(1);
    return new MsgExecuteContract(walletAddress, GOV_CONTRACT_ADDR, {
      cast_vote: { poll_id, vote, amount: uhalo.toString() },
    });
  }

  return {
    client: cw20Contract.client,
    config,
    gov_state,
    haloBalance: cw20Contract.info,
    haloInfo: cw20Contract.balance(GOV_CONTRACT_ADDR),
    polls,
    staker,
    walletAddress: cw20Contract.walletAddress,
    createEndPollMsg,
    createGovClaimMsg,
    createGovStakeMsg,
    createGovUnstakeMsg,
    createPollMsgs,
    createVoteMsg,
    estimateFee: cw20Contract.estimateFee,
    query: cw20Contract.query,
  };
}

export type GovContract = BaseContract & {
  config: ContractQueryArgs;
  gov_state: ContractQueryArgs;
  haloBalance: ContractQueryArgs;
  haloInfo: ContractQueryArgs;
  polls: ContractQueryArgs;
  staker: ContractQueryArgs;
  createEndPollMsg: (poll_id: number) => MsgExecuteContract;
  createGovClaimMsg: () => MsgExecuteContract;
  createGovStakeMsg: (amount: number | string) => MsgExecuteContract;
  createGovUnstakeMsg: (amount: number) => MsgExecuteContract;
  createPollMsgs: (
    amount: number,
    title: string,
    description: string,
    link?: string
  ) => MsgExecuteContract;
  createVoteMsg: (
    poll_id: number,
    vote: Vote,
    amount: number
  ) => MsgExecuteContract;
};
