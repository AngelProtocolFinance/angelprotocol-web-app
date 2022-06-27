import {
  EmbeddedWasmMsg,
  Source,
  UpdateProfilePayload,
} from "types/server/contracts";
import createEmbeddedWasmMsg from "helpers/createEmbeddedWasmMsg";

export function createAccountContract(accountAddr: string): AccountContract {
  const balance = {
    address: accountAddr,
    msg: { balance: {} },
  };
  const profile = {
    address: accountAddr,
    msg: { get_profile: {} },
  };

  function createEmbeddedWithdrawMsg(args: WithdrawMsgArgs): EmbeddedWasmMsg {
    return createEmbeddedWasmMsg([], accountAddr, {
      withdraw: { ...args },
    });
  }

  function createEmbeddedUpdateProfileMsg(
    payload: UpdateProfilePayload
  ): EmbeddedWasmMsg {
    return createEmbeddedWasmMsg([], accountAddr, {
      update_profile: payload,
    });
  }

  return {
    balance,
    profile,
    createEmbeddedUpdateProfileMsg,
    createEmbeddedWithdrawMsg,
  };
}

type WithdrawMsgArgs = {
  sources: Source[];
  beneficiary: string;
};

export type AccountContract = {
  balance: {
    address: string;
    msg: { balance: object };
  };
  profile: {
    address: string;
    msg: { get_profile: object };
  };
  createEmbeddedWithdrawMsg: (args: WithdrawMsgArgs) => EmbeddedWasmMsg;
  createEmbeddedUpdateProfileMsg: (
    payload: UpdateProfilePayload
  ) => EmbeddedWasmMsg;
};
