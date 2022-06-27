import { Source, UpdateProfilePayload } from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import createContract from "./createContract";

export default async function createAccount(
  wallet: WalletState,
  accountAddr: string
) {
  const contract = await createContract(wallet);

  const balance = {
    address: accountAddr,
    msg: { balance: {} },
  };
  const profile = {
    address: accountAddr,
    msg: { get_profile: {} },
  };

  function createEmbeddedWithdrawMsg({
    sources,
    beneficiary,
  }: {
    sources: Source[];
    beneficiary: string;
  }) {
    return contract.createEmbeddedWasmMsg([], accountAddr, {
      withdraw: {
        sources: sources,
        beneficiary,
      },
    });
  }

  function createEmbeddedUpdateProfileMsg(payload: UpdateProfilePayload) {
    return contract.createEmbeddedWasmMsg([], accountAddr, {
      update_profile: payload,
    });
  }

  return {
    ...contract,
    balance,
    profile,
    createEmbeddedUpdateProfileMsg,
    createEmbeddedWithdrawMsg,
  };
}
