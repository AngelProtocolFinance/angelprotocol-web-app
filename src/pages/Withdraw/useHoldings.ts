import { useEffect, useState } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Account from "contracts/Account";

export default function useHoldings(address: string) {
  const [getHoldingsError, setHoldingsError] = useState("");
  const [anchorVault, setAnchorVault] = useState("");
  const [lockedNativeTokens, setLockedNativeTokens] = useState<number>();
  const [lockedCW20Tokens, setLockedCW20Tokens] = useState<number>();
  const [liquidNativeTokens, setLiquidNativeTokens] = useState<number>();
  const [liquidCW20Tokens, setLiquidCW20Tokens] = useState<number>();
  const wallet = useConnectedWallet();
  let lockedcw20: string,
    liquidcw20: string,
    lockedNative: string,
    liquidNative: string,
    ancVault: string;

  useEffect(() => {
    (async () => {
      try {
        setHoldingsError("");
        const account = new Account(address, wallet);
        const result = await account.getHoldings();
        if (result.locked_cw20.length != 0) {
          // REMINDER:
          // In testnet, there are two anchor vaults used to test the re-balancing logic
          lockedcw20 = result.locked_cw20[1].amount;
          liquidcw20 = result.liquid_cw20[1].amount;
          ancVault = result.liquid_cw20[1].address;
        } else if (result.locked_native.length != 0) {
          lockedNative = result.locked_native[1].amount;
          liquidNative = result.liquid_native[1].amount;
        }

        setAnchorVault(ancVault);
        setLockedCW20Tokens(Number(lockedcw20));
        setLockedNativeTokens(Number(lockedNative));
        setLiquidCW20Tokens(Number(liquidcw20));
        setLiquidNativeTokens(Number(liquidNative));
      } catch (err) {
        console.error(err);
        setHoldingsError("Failed to get balance.");
      }
    })();
    //eslint-disable-next-line
  }, [wallet]);

  return {
    getHoldingsError,
    lockedNativeTokens,
    lockedCW20Tokens,
    liquidNativeTokens,
    liquidCW20Tokens,
    anchorVault,
  };
}
