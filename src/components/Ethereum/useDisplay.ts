import maskAddress from "helpers/maskAddress";
import { useState } from "react";
import { useWallet } from "use-wallet";
import { utils } from "ethers";
import toCurrency from "helpers/toCurrency";

export default function useDisplay() {
  const [detailsShown, showDetails] = useState(false);
  //eth balance
  //   const { ustAmount, coins } = useBalance();
  const wallet = useWallet();
  const chainId = wallet.networkName;
  const maskedAddr = maskAddress(wallet.account || "");
  //convert to ether
  const balance = parseFloat(utils.formatUnits(wallet.balance) || "0");
  const toggleDetails = () => showDetails((p) => !p);
  const hideDetails = () => showDetails(false);

  return {
    toggleDetails,
    hideDetails,
    chainId,
    maskedAddr,
    balance: toCurrency(balance, 3, true),
    detailsShown,
  };
}
