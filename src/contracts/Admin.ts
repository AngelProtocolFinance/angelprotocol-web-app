import { MsgExecuteContract } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
import { ContractQueryArgs } from "services/terra/types";
import { Member } from "services/terra/admin/types";
import Contract from "./Contract";
import { EmbeddedWasmMsg, Vote } from "./types";
import { sc } from "constants/sc";

export default class Admin extends Contract {
  apCW4_addr: string;
  apCW3_addr: string;
  coCW4_addr: string;
  gaCW3_addr: string;

  members: ContractQueryArgs;
  member: ContractQueryArgs;
  proposals: ContractQueryArgs;
  proposal: (arg: number) => ContractQueryArgs;
  voteList: (arg: number) => ContractQueryArgs;
  voter: ContractQueryArgs;

  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.apCW4_addr = contracts[this.chainID][sc.apCW4];
    this.apCW3_addr = contracts[this.chainID][sc.apCW3];
    this.coCW4_addr = contracts[this.chainID][sc.coCW4];
    this.gaCW3_addr = contracts[this.chainID][sc.gaCW3];

    //query args
    this.members = {
      address: this.apCW4_addr,
      msg: { list_members: {} },
    };

    this.member = {
      address: this.apCW4_addr,
      msg: { member: { addr: this.walletAddr } },
    };

    this.proposals = {
      address: this.apCW3_addr,
      msg: {
        reverse_proposals: {},
      },
    };

    this.proposal = (pollId: number) => ({
      address: this.apCW3_addr,
      msg: {
        proposal: {
          proposal_id: pollId,
        },
      },
    });

    this.voteList = (pollId: number) => ({
      address: this.apCW3_addr,
      msg: {
        list_votes: {
          proposal_id: pollId,
        },
      },
    });

    this.voter = {
      address: this.apCW3_addr,
      msg: {
        voter: {
          address: this.walletAddr,
        },
      },
    };
  }

  //execute message creators
  createEmbeddedUpdateMembersMsg(to_add: Member[], to_remove: string[]) {
    return this.createdEmbeddedWasmMsg([], this.apCW4_addr, {
      update_members: {
        add: to_add,
        remove: to_remove,
      },
    });
  }

  createExecProposalMsg(proposal_id: number) {
    this.checkWallet();
    return new MsgExecuteContract(this.walletAddr!, this.apCW3_addr, {
      execute: {
        proposal_id,
      },
    });
  }

  createProposalMsg(
    title: string,
    description: string,
    embeddedMsgs: EmbeddedWasmMsg[],
    latest?: any
  ) {
    this.checkWallet();
    return new MsgExecuteContract(this.walletAddr!, this.apCW3_addr, {
      propose: {
        title,
        description,
        msgs: embeddedMsgs,
      },
    });
  }

  async createVoteTx(proposal_id: number, vote: Vote) {
    this.checkWallet();
    const voteMsg = new MsgExecuteContract(this.walletAddr!, this.apCW3_addr, {
      vote: {
        proposal_id,
        vote,
      },
    });
    const fee = await this.estimateFee([voteMsg]);
    return { msgs: [voteMsg], fee };
  }
}
