import { FormValues, Redeem } from "./types";
import { AccountType, EmbeddedWasmMsg, RedeemPayload } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import useCosmosTxSender from "hooks/useCosmosTxSender";
import { scaleToStr } from "helpers";

export default function useRedeem() {
  const { cw3, id, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const sendTx = useCosmosTxSender();

  async function redeem(data: FormValues) {
    const account = new Account(wallet);

    let msgs: EmbeddedWasmMsg[] = [];

    const liquidVaults = getVaultsWithType("liquid", data.redeems);
    const lockedVaults = getVaultsWithType("locked", data.redeems);

    //at least one of account types is filled prior to submission
    if (liquidVaults.length > 0) {
      msgs.push(
        account.createEmbeddedRedeemMsg({
          id,
          acct_type: "liquid",
          vaults: liquidVaults,
        })
      );
    }

    if (lockedVaults.length > 0) {
      msgs.push(
        account.createEmbeddedRedeemMsg({
          id,
          acct_type: "locked",
          vaults: lockedVaults,
        })
      );
    }

    const cw3contract = new CW3(wallet, cw3);
    //proposal meta for preview
    const proposal = cw3contract.createProposalMsg(
      "Redeem",
      `redeem funds for endowment: ${id}`,
      msgs
    );

    await sendTx({ msgs: [proposal], ...propMeta });
  }

  return {
    redeem,
  };
}

function getVaultsWithType(
  type: AccountType,
  vaults: Redeem[]
): RedeemPayload["vaults"] {
  return vaults
    .filter((v) => v.type === type)
    .map(({ vault, amount }) => [
      vault,
      scaleToStr(amount || 0 /** blank fields have amount set to "" */),
    ]);
}
