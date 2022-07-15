import { ContractQueryArgs as CQA } from "services/types";
import {
  CWContracts,
  EmbeddedBankMsg,
  EmbeddedWasmMsg,
  Member,
  PageOptions,
  Vote,
  VotesPageOptions,
} from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class Admin extends Contract {
  cw4Contract: CW4;

  //CW4
  members: CQA;
  member: CQA;

  //CW3
  proposals: (arg: PageOptions) => CQA;
  proposal: (arg: number) => CQA;
  voteList: (arg: VotesPageOptions) => CQA;
  cw3Config: CQA;

  constructor(wallet: WalletState | undefined, cws: CWContracts) {
    super(wallet, getCW3Address(cws));

    this.cw4Contract = new CW4(wallet, cws);

    //query args CW4
    this.members = this.cw4Contract.members;
    this.member = this.cw4Contract.member;

    //query args CW3
    this.cw3Config = {
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
  }

  //execute message creators
  createEmbeddedUpdateMembersMsg(to_add: Member[], to_remove: string[]) {
    return this.cw4Contract.createEmbeddedUpdateMembersMsg(to_add, to_remove);
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

class CW4 extends Contract {
  members: CQA;
  member: CQA;

  constructor(wallet: WalletState | undefined, cws: CWContracts) {
    super(wallet, getCW4Address(cws));

    this.members = {
      address: this.contractAddress,
      msg: { list_members: {} },
    };

    this.member = {
      address: this.contractAddress,
      msg: { member: { addr: this.walletAddress } },
    };
  }

  createEmbeddedUpdateMembersMsg(to_add: Member[], to_remove: string[]) {
    return this.createEmbeddedWasmMsg([], {
      update_members: {
        add: to_add,
        remove: to_remove,
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
