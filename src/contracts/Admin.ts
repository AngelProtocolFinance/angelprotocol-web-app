import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { MsgExecuteContract } from "@terra-money/terra.js";
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
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class Admin extends Contract {
  cw4: string;
  cw3: string;

  //CW4
  members: CQA;
  member: CQA;

  //CW3
  proposals: (arg: PageOptions) => CQA;
  proposal: (arg: number) => CQA;
  voteList: (arg: VotesPageOptions) => CQA;
  cw3Config: CQA;

  constructor(
    client: SigningCosmWasmClient,
    cws: CWContracts,
    walletAddr?: string
  ) {
    super(client, walletAddr);
    //make sure to use query skips on empty addresses
    this.cw4 = cws === "apTeam" ? contracts.apCW4 : cws.cw4 || "";
    this.cw3 = cws === "apTeam" ? contracts.apCW3 : cws.cw3 || "";

    //query args CW4
    this.members = {
      address: this.cw4,
      msg: { list_members: {} },
    };

    this.member = {
      address: this.cw4,
      msg: { member: { addr: this.walletAddr } },
    };

    //query args CW3
    this.cw3Config = {
      address: this.cw3,
      msg: { config: {} },
    };

    this.proposals = (pageOptions) => ({
      address: this.cw3,
      msg: {
        reverse_proposals: pageOptions,
      },
    });

    this.proposal = (pollId: number) => ({
      address: this.cw3,
      msg: {
        proposal: {
          proposal_id: pollId,
        },
      },
    });

    this.voteList = (options) => ({
      address: this.cw3,
      msg: {
        list_votes: {
          ...options,
        },
      },
    });
  }

  //execute message creators
  createEmbeddedUpdateMembersMsg(to_add: Member[], to_remove: string[]) {
    return this.createEmbeddedWasmMsg([], this.cw4, {
      update_members: {
        add: to_add,
        remove: to_remove,
      },
    });
  }

  createEmbeddedUpdateConfigMsg(height: number, threshold: string) {
    return this.createEmbeddedWasmMsg([], this.cw3, {
      update_config: {
        threshold: { absolute_percentage: { percentage: threshold } },
        max_voting_period: { height },
      },
    });
  }

  createExecProposalMsg(proposal_id: number) {
    return new MsgExecuteContract(this.walletAddr, this.cw3, {
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
    return new MsgExecuteContract(this.walletAddr, this.cw3, {
      propose: {
        title,
        description,
        meta,
        msgs: embeddedMsgs,
      },
    });
  }

  createVoteMsg(proposal_id: number, vote: Vote) {
    return new MsgExecuteContract(this.walletAddr, this.cw3, {
      vote: {
        proposal_id,
        vote,
      },
    });
  }
}
