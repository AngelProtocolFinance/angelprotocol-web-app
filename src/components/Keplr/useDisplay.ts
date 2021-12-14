import maskAddress from "helpers/maskAddress";
import toCurrency from "helpers/toCurrency";
import { useState } from "react";
import { chains } from "contracts/types";
import { useGetKeplr } from "wallets/Keplr";

export default function useDisplay() {
  const { address, balance } = useGetKeplr();
  const [detailsShown, showDetails] = useState(false);
  const display_bal = +balance[0]?.amount || 0;
  const maskedAddr = maskAddress(address);
  const toggleDetails = () => showDetails((p) => !p);
  const hideDetails = () => showDetails(false);
  return {
    toggleDetails,
    hideDetails,
    chainId: chains.sol_dev,
    maskedAddr,
    balance: toCurrency(display_bal / 1e6, 3),
    detailsShown,
  };
}
