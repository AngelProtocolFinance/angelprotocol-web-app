import { useEffect, useState } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Account from "contracts/Account";

export default function useHoldings(address: string) {
  const [getHoldingsError, setHoldingsError] = useState("");
  const [anchorVault, setAnchorVault] = useState("");
  const [liquidNativeTokens, setLiquidNativeTokens] = useState<number>();
  const [liquidCW20Tokens, setLiquidCW20Tokens] = useState<number>();
  // eslint-disable-next-line
  const [liquidNativeTokenValue, setLiquidNativeTokenValue] =
    useState<number>();
  const [liquidCW20TokenValue, setLiquidCW20TokenValue] = useState<number>();
  const wallet = useConnectedWallet();

  //TODO: //deep eslint issues here, may need refactoring of code
  //wasn't able to review pr since it's tagged "WIP"

  // eslint-disable-next-line
  let liquidcw20: string, liquidNative: string, ancVault: string;
  // eslint-disable-next-line
  let vaultArray: any = [];

  useEffect(() => {
    (async () => {
      try {
        setHoldingsError("");
        const account = new Account(address, wallet);
        const holdingsResult = await account.getHoldings(); // Returns all liquid and locked (CW20 and native token) holdings

        // In the future, this if statement can be used to pick which vault the user indicates
        // If multiple vaults exist, we might need a function that removes a single vault from the array
        if (holdingsResult.liquid_cw20.length !== 0) {
          // REMINDER: There's only one vault for now
          // eslint-disable-next-line
          liquidcw20 = holdingsResult.liquid_cw20[0].amount;
          // eslint-disable-next-line
          ancVault = holdingsResult.liquid_cw20[0].address;

          // sumHoldings() accepts an array
          vaultArray.push({
            amount: liquidcw20,
            address: ancVault,
          });

          // After getting the quantity of tokens, convert their value to UST
          const liquidcw20Value = await account.sumHoldings(vaultArray);
          setLiquidCW20TokenValue(Number(liquidcw20Value));
        } else if (holdingsResult.liquid_native.length !== 0) {
          // eslint-disable-next-line
          liquidNative = holdingsResult.liquid_native[0].amount;
        }

        setAnchorVault(ancVault);
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
    liquidNativeTokens,
    liquidCW20Tokens,
    liquidNativeTokenValue,
    liquidCW20TokenValue,
    anchorVault,
  };
}
