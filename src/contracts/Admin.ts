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
  cw4: string;

  //CW4
  members: CQA;
  member: CQA;

  //CW3
  proposals: (arg: PageOptions) => CQA;
  proposal: (arg: number) => CQA;
  voteList: (arg: VotesPageOptions) => CQA;
  cw3Config: CQA;

  constructor(wallet: WalletState | undefined, cws: CWContracts) {
    const cw3 = cws === "apTeam" ? contracts.apCW3 : cws.cw3 || "";

    super(wallet, cw3);

    //make sure to use query skips on empty addresses
    this.cw4 = cws === "apTeam" ? contracts.apCW4 : cws.cw4 || "";

    //query args CW4
    this.members = {
      address: this.cw4,
      msg: { list_members: {} },
    };

    this.member = {
      address: this.cw4,
      msg: { member: { addr: this.walletAddress } },
    };

    //query args CW3
    this.cw3Config = {
      address: cw3,
      msg: { config: {} },
    };

    this.proposals = (pageOptions) => ({
      address: cw3,
      msg: {
        reverse_proposals: pageOptions,
      },
    });

    this.proposal = (pollId: number) => ({
      address: cw3,
      msg: {
        proposal: {
          proposal_id: pollId,
        },
      },
    });

    this.voteList = (options) => ({
      address: cw3,
      msg: {
        list_votes: {
          ...options,
        },
      },
    });
  }

  //execute message creators
  createEmbeddedUpdateMembersMsg(to_add: Member[], to_remove: string[]) {
    return this.createEmbeddedWasmMsg(
      [],
      {
        update_members: {
          add: to_add,
          remove: to_remove,
        },
      },
      this.cw4
    );
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
