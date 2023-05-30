import { WithdrawValues } from "./types";
import { AccountType, EndowmentDetails } from "types/contracts";
import { SimulContractTx } from "types/evm";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import { WithdrawMeta } from "contracts/createTx/meta";
import { scaleToStr } from "helpers";
import { ap_wallets } from "constants/ap_wallets";
import { chainIds } from "constants/chainIds";

export function constructTx(
  sender: string,
  id: number,
  endow: EndowmentDetails,
  wv: WithdrawValues
) {
  //construct amounts

  const accType: AccountType = wv.type === "locked" ? 0 : 1;
  const isPolygon = wv.network === chainIds.polygon;
  const beneficiary = isPolygon ? wv.beneficiary : ap_wallets.polygon_withdraw;

  const metadata: WithdrawMeta = {
    beneficiary,
    tokens: wv.amounts.map((a) => ({
      logo: "" /** TODO: ap-justin */,
      symbol: "" /** TODO: ap-justin */,
      amount: +a.value,
    })),
  };

  const isLockedCharity = endow.endowType === "charity" && wv.type === "locked";

  const [data, dest, meta] = encodeTx(
    "accounts.withdraw",
    {
      id,
      type: accType,
      beneficiaryAddress: beneficiary,
      beneficiaryEndowId: 0, //TODO: ap-justin UI to set endow id
      tokens: wv.amounts.map((a) => ({
        addr: a.tokenId,
        amount: scaleToStr(a.value),
      })),
    },
    metadata
  );

  //prettier-ignore
  const isDirect =
      endow.endowType === "normal" &&
      (
        (wv.type === "liquid" && endow.allowlistedBeneficiaries.includes(sender)) ||
        (wv.type === "locked" && endow.maturityAllowlist.includes(sender))
      );

  const tx: SimulContractTx = isDirect
    ? {
        from: sender,
        to: dest,
        data,
      }
    : createTx(sender, "multisig.submit-transaction", {
        multisig: endow.owner,
        title: `${wv.type} withdraw `,
        description: isLockedCharity
          ? wv.reason
          : `${wv.type} withdraw from endowment id: ${id}`,
        destination: dest,
        value: "0",
        data,
        meta: meta.encoded,
      });

  return { tx, isDirect, isPolygon };
}
