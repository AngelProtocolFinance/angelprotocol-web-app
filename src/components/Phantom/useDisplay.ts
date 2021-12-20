import { useGetPhantom } from "wallets/Phantom";
import maskAddress from "helpers/maskAddress";
import toCurrency from "helpers/toCurrency";
import { useState } from "react";
import { chainIDs } from "contracts/types";

export default function useDisplay() {
  const { address, balance } = useGetPhantom();
  const [detailsShown, showDetails] = useState(false);
  const maskedAddr = maskAddress(address);
  const toggleDetails = () => showDetails((p) => !p);
  const hideDetails = () => showDetails(false);
  return {
    toggleDetails,
    hideDetails,
    chainId: chainIDs.sol_dev,
    maskedAddr,
    balance: toCurrency(balance / 1e9, 3, true),
    detailsShown,
  };
}
