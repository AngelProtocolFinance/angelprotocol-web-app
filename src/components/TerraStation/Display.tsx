import { useConnectedWallet } from "@terra-money/wallet-provider";
import maskAddress from "helpers/maskAddress";
import toCurrency from "helpers/toCurrency";
import { useState } from "react";
import Copier from "./Copier";
import useBalance from "./useBalance";
import { FiMoreHorizontal } from "react-icons/fi";
import Details from "./Details";

export default function Display() {
  //this component won't be rendered if wallet is not connected
  const [detailsShown, showDetails] = useState(false);
  const { ustAmount, coins } = useBalance();
  const wallet = useConnectedWallet();
  const addr = wallet?.walletAddress;
  const chainId = wallet?.network.chainID || "unknown";
  const maskedAddr = maskAddress(wallet?.terraAddress);

  const toggleDetails = () => showDetails((p) => !p);
  const hideDetails = () => showDetails(false);

  return (
    <div className="flex">
      <span className="pr-2 border-r text-sm text-white-grey">
        {maskedAddr}
      </span>
      <span className="px-2 text-sm text-sm text-white-grey">
        UST {toCurrency(ustAmount)}
      </span>
      <Copier text={addr} />
      <button onClick={toggleDetails} className="ml-2">
        <FiMoreHorizontal
          className="text-white hover:text-orange"
          title="More Options"
        />
      </button>
      {detailsShown && (
        <Details
          chainId={chainId}
          coinData={coins}
          closeHandler={hideDetails}
        />
      )}
    </div>
  );
}
