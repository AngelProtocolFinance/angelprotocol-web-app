import { WithdrawValues } from "./types";
import { EndowmentDetails } from "types/contracts";
import { AccountType } from "types/contracts/evm/account";
import { SimulContractTx } from "types/evm";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import { scaleToStr } from "helpers";
import { ap_wallets } from "constants/ap_wallets";
import { chainIds } from "constants/chainIds";

/**
 * WITHRAWS FOR POLYGON
 *
 * --- NORMAL ENDOWMENTS ---
 * LIQUID
 * if sender is in beneficity whitelist, can send `accounts.withdraw` directly
 * if sender is not in whitelist, but in multisig, should send `accounts.withdraw` via endow-multisig
 *
 * LOCKED
 * if sender is in maturity whitelist, can send `accounts.withdraw` directly
 * if sender is not in whitelist, but in multisig, should send `accounts.withdraw` via endow-multisig
 *
 * --- CHARITY ---
 * LIQUID
 * `accounts.withdraw` via endow-multisig
 *
 * LOCKED
 * `locked-withdraw.propose` via endow-multisig
 *
 */

export function constructTx(
  sender: string,
  id: number,
  endow: EndowmentDetails,
  wv: WithdrawValues
) {
  //construct amounts
  let addresses: string[] = [];
  let amounts: string[] = [];

  const accType: AccountType = wv.type === "locked" ? 0 : 1;
  for (const amount of wv.amounts) {
    addresses.push(amount.tokenId);
    amounts.push(scaleToStr(amount.value));
  }

  const isPolygon = wv.network === chainIds.polygon;
  const beneficiary = isPolygon ? wv.beneficiary : ap_wallets.polygon_withdraw;

  const isLockedCharity =
    endow.endow_type === "charity" && wv.type === "locked";

  const [data, dest] = isLockedCharity
    ? encodeTx("locked-withdraw.propose", {
        id,
        beneficiary,
        addresses,
        amounts,
      })
    : encodeTx("accounts.withdraw", {
        id,
        type: accType,
        beneficiary,
        addresses,
        amounts,
      });

  //prettier-ignore
  const isDirect =
      endow.endow_type === "normal" &&
      (
        (wv.type === "liquid" && endow.whitelistedBeneficiaries.includes(sender)) ||
        (wv.type === "locked" && endow.maturityWhitelist.includes(sender))
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
      });

  return { tx, isDirect, isPolygon };
}
