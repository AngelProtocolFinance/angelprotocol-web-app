import { useWallet, WalletStatus } from "@terra-dev/use-wallet";
import { Coin } from "@terra-money/terra.js";
import { IoClose } from "react-icons/io5";
import Holdings from "./Holdings";

type Props = {
  coinData: Coin.Data[];
  closeHandler: () => void;
  chainId: string;
};

export default function Details(props: Props) {
  const { disconnect, status } = useWallet();
  const isConnected = status === WalletStatus.WALLET_CONNECTED;
  const isEmpty = props.coinData.length <= 0;
  const handleDisconnect = () => disconnect();

  return (
    <div className="grid grid-rows-a1a absolute top-full mt-2 bg-white bg-opacity-10 w-full left-0 rounded-md overflow-hidden">
      <button
        className="text-black absolute top-2 right-2"
        onClick={props.closeHandler}
      >
        <IoClose />
      </button>
      <div className="bg-white text-angel-grey uppercase text-sm p-2">
        network : {props.chainId}
      </div>
      {(!isEmpty && <Holdings coinData={props.coinData} />) || (
        <span className="p-10 text-center text-sm uppercase">
          Wallet is empty
        </span>
      )}
      <button
        disabled={!isConnected}
        onClick={handleDisconnect}
        className="uppercase text-sm bg-blue-accent p-2 "
      >
        disconnect
      </button>
    </div>
  );
}
