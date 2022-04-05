import { MsgExecuteContract } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
import { ContractQueryArgs as CQA } from "services/terra/types";
import { Member } from "services/terra/admin/types";
import Contract from "./Contract";
import { EmbeddedWasmMsg, Vote } from "./types";
import { sc } from "constants/sc";

export type CWContracts = "apTeam" | { cw3?: string; cw4?: string };
export default class Admin extends Contract {
  cw4: string;
  cw3: string;

  //CW4
  members: CQA;
  member: CQA;

  //CW3
  proposals: CQA;
  proposal: (arg: number) => CQA;
  voteList: (arg: number) => CQA;
  voter: CQA;
  cw3Config: CQA;

  constructor(cws: CWContracts, wallet?: ConnectedWallet) {
    super(wallet);
    //make sure to use query skips on empty addresses
    this.cw4 =
      cws === "apTeam" ? contracts[this.chainID][sc.apCW4] : cws.cw4 || "";
    this.cw3 =
      cws === "apTeam" ? contracts[this.chainID][sc.apCW3] : cws.cw3 || "";

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

    this.proposals = {
      address: this.cw3,
      msg: {
        reverse_proposals: {},
      },
    };

    this.proposal = (pollId: number) => ({
      address: this.cw3,
      msg: {
        proposal: {
          proposal_id: pollId,
        },
      },
    });

    this.voteList = (pollId: number) => ({
      address: this.cw3,
      msg: {
        list_votes: {
          proposal_id: pollId,
        },
      },
    });

    this.voter = {
      address: this.cw3,
      msg: {
        voter: {
          address: this.walletAddr,
        },
      },
    };
  }

  //execute message creators
  createEmbeddedUpdateMembersMsg(to_add: Member[], to_remove: string[]) {
    return this.createdEmbeddedWasmMsg([], this.cw4, {
      update_members: {
        add: to_add,
        remove: to_remove,
      },
    });
  }

  createEmbeddedUpdateConfigMsg(height: number, threshold: string) {
    return this.createdEmbeddedWasmMsg([], this.cw3, {
      update_config: {
        threshold: { absolute_percentage: { percentage: threshold } },
        max_voting_period: { height },
      },
    });
  }

  createExecProposalMsg(proposal_id: number) {
    this.checkWallet();
    return new MsgExecuteContract(this.walletAddr!, this.cw3, {
      execute: {
        proposal_id,
      },
    });
  }

  createProposalMsg(
    title: string,
    description: string,
    embeddedMsgs: EmbeddedWasmMsg[],
    meta?: string,
    latest?: any
  ) {
    this.checkWallet();
    return new MsgExecuteContract(this.walletAddr!, this.cw3, {
      propose: {
        title,
        description,
        meta,
        msgs: embeddedMsgs,
      },
    });
  }

  createVoteMsg(proposal_id: number, vote: Vote) {
    this.checkWallet();
    return new MsgExecuteContract(this.walletAddr!, this.cw3, {
      vote: {
        proposal_id,
        vote,
      },
    });
  }
}
