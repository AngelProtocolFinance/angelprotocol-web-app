import { ContractQueryArgs as CQA } from "services/types";
import {
  CWContracts,
  EmbeddedBankMsg,
  EmbeddedWasmMsg,
  PageOptions,
  Vote,
  VotesPageOptions,
} from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class CW3 extends Contract {
  //CW3
  proposals: (arg: PageOptions) => CQA;
  proposal: (arg: number) => CQA;
  voteList: (arg: VotesPageOptions) => CQA;
  votes: (arg: VotesPageOptions) => CQA;
  voter: (arg: string) => CQA;
  config: CQA;

  constructor(wallet: WalletState | undefined, address: string) {
    super(wallet, address);

    this.voter = (voter) => ({
      address: this.contractAddress,
      msg: { voter: { address: voter } },
    });

    this.config = {
      address: this.contractAddress,
      msg: { config: {} },
    };

    this.proposals = (pageOptions) => ({
      address: this.contractAddress,
      msg: {
        reverse_proposals: pageOptions,
      },
    });

    this.proposal = (pollId: number) => ({
      address: this.contractAddress,
      msg: {
        proposal: {
          proposal_id: pollId,
        },
      },
    });

    this.voteList = (options) => ({
      address: this.contractAddress,
      msg: {
        list_votes: {
          ...options,
        },
      },
    });

    this.votes = (options) => ({
      address: this.contractAddress,
      msg: {
        list_votes: {
          ...options,
        },
      },
    });
  }

  createEmbeddedUpdateConfigMsg(height: number, threshold: string) {
    return this.createEmbeddedWasmMsg([], {
      update_config: {
        threshold: { absolute_percentage: { percentage: threshold } },
        max_voting_period: { height },
      },
    });
  }

  createExecProposalMsg(proposal_id: number) {
    return this.createExecuteContractMsg({
      execute: {
        proposal_id,
      },
    });
  }

  createProposalMsg(
    title: string,
    description: string,
    embeddedMsgs: (EmbeddedBankMsg | EmbeddedWasmMsg)[],
    meta?: string
  ) {
    return this.createExecuteContractMsg({
      propose: {
        title,
        description,
        meta,
        msgs: embeddedMsgs,
      },
    });
  }

  createVoteMsg(proposal_id: number, vote: Vote) {
    return this.createExecuteContractMsg({
      vote: {
        proposal_id,
        vote,
      },
    });
  }
}

function getCW4Address(cws: CWContracts): string {
  return cws === "apTeam" ? contracts.apCW4 : cws.cw4 || "";
}

function getCW3Address(cws: CWContracts) {
  return cws === "apTeam" ? contracts.apCW3 : cws.cw3 || "";
}
