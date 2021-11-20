import { useGetPhantom } from "contexts/PhantomProvider";
import maskAddress from "helpers/maskAddress";
import toCurrency from "helpers/toCurrency";
import { useState } from "react";

export default function useDisplay() {
  const { address, balance } = useGetPhantom();
  const [detailsShown, showDetails] = useState(false);
  const maskedAddr = maskAddress(address);
  const toggleDetails = () => showDetails((p) => !p);
  const hideDetails = () => showDetails(false);

  return {
    toggleDetails,
    hideDetails,
    chainId: "dev-net",
    maskedAddr,
    balance: toCurrency(balance / 1e9, 3),
    detailsShown,
  };
}
