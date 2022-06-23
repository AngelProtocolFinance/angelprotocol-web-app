import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { ContractQueryArgs } from "services/types";
import { Source, UpdateProfilePayload } from "types/server/contracts";
import Contract from "./Contract";

export default class Account extends Contract {
  accountAddr: string;
  balance: ContractQueryArgs;
  profile: ContractQueryArgs;

  constructor(
    client: SigningCosmWasmClient,
    accountAddr: string,
    walletAddr?: string
  ) {
    super(client, walletAddr);
    this.accountAddr = accountAddr;

    this.balance = {
      address: this.accountAddr,
      msg: { balance: {} },
    };

    this.profile = {
      address: this.accountAddr,
      msg: { get_profile: {} },
    };
  }

  createEmbeddedWithdrawMsg({
    sources,
    beneficiary,
  }: {
    sources: Source[];
    beneficiary: string;
  }) {
    return this.createEmbeddedWasmMsg([], this.accountAddr, {
      withdraw: {
        sources: sources,
        beneficiary,
      },
    });
  }

  createEmbeddedUpdateProfileMsg(payload: UpdateProfilePayload) {
    return this.createEmbeddedWasmMsg([], this.accountAddr, {
      update_profile: payload,
    });
  }
}
