import { MsgExecuteContract } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
import { ContractQueryArgs as CQA } from "services/terra/types";
import { Member } from "services/terra/admin/types";
import Contract from "./Contract";
import { EmbeddedWasmMsg, Vote } from "./types";
import { sc } from "constants/sc";

export default class APAdmin extends Contract {
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
  config: CQA;

  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.cw4 = contracts[this.chainID][sc.apCW4];
    this.cw3 = contracts[this.chainID][sc.apCW3];

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
    this.config = {
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
    latest?: any
  ) {
    this.checkWallet();
    return new MsgExecuteContract(this.walletAddr!, this.cw3, {
      propose: {
        title,
        description,
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

export type CAaddresses = { cw3?: string; cw4?: string };
export class CharityAdmin extends APAdmin {
  constructor(addresses: CAaddresses, wallet?: ConnectedWallet) {
    //caution to use this contract to the extent of address provided
    //e.g don't query cw4 if you only provide cw3 address and vice versa
    super(wallet);
    this.cw3 = addresses.cw3 || "";
    this.cw4 = addresses.cw4 || "";
  }
}
