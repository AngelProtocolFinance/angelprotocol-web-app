import { useConnectedWallet } from "@terra-money/wallet-provider";
import maskAddress from "helpers/maskAddress";
import toCurrency from "helpers/toCurrency";
import { useState } from "react";
import useBalance from "./useBalance";
import Details from "./Details";
// import terraIcon from "assets/icons/wallets/terra-station.jpg";
import Icon from "components/WalletSuite/Icon";

export default function Display() {
  //this component won't be rendered if wallet is not connected
  const [detailsShown, showDetails] = useState(false);
  const { ustAmount, coins } = useBalance();
  const wallet = useConnectedWallet();
  const chainId = wallet?.network.chainID || "unknown";
  const maskedAddr = maskAddress(wallet?.terraAddress);

  const toggleDetails = () => showDetails((p) => !p);
  const hideDetails = () => showDetails(false);

  return (
    <div className="flex">
      <button onClick={toggleDetails} className="flex items-center py-2 px-3">
        {/* <img src={terraIcon} alt="" className="w-6 h-6 rounded-full mr-2" /> */}
        <Icon />
        <span className="pr-2 text-sm text-white-grey hidden sm:block">
          {maskedAddr}
        </span>
        <span className="pl-2 text-sm text-sm text-white-grey sm:border-l">
          UST {toCurrency(ustAmount, 3)}
        </span>
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
