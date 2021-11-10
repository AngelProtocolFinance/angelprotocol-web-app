import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { Coin } from "@terra-money/terra.js";
import { IoClose } from "react-icons/io5";
import Holdings from "./Holdings";
import Address from "./Address";
import Portal from "./Portal";
import { useState } from "react";
import { denoms } from "constants/currency";
import Filter from "./Filter";

type Props = {
  coinData: Coin.Data[];
  closeHandler: () => void;
  chainId: string;
};

const criterionAmount = 10;
export default function Details(props: Props) {
  const [filtered, setFilter] = useState(false);
  const coins = props.coinData.filter(
    (coin) =>
      filtered ||
      coin.denom === denoms.uusd ||
      Number(coin.amount) > criterionAmount
  );
  const handleFilter = () => setFilter((p) => !p);
  const { disconnect, status, wallets } = useWallet();
  const isConnected = status === WalletStatus.WALLET_CONNECTED;

  const isEmpty = coins.length <= 0;
  const addr = wallets[0]?.terraAddress;
  const handleDisconnect = () => disconnect();

  return (
    <div className="z-50 grid grid-rows-a1a absolute top-full mt-2 bg-white w-full left-0 rounded-md overflow-hidden shadow-lg">
      <button
        className="text-white absolute top-2 right-2"
        onClick={props.closeHandler}
      >
        <IoClose />
      </button>
      <div className="bg-angel-grey text-white-grey text-sm p-2">
        <p className="uppercase">network : {props.chainId}</p>
      </div>
      {!isEmpty && <Filter filtered={filtered} handleFilter={handleFilter} />}
      <Address address={addr} />
      <Portal />
      {(!isEmpty && <Holdings coinData={coins} />) || (
        <span className="text-angel-grey p-10 text-center text-sm uppercase">
          Wallet is empty
        </span>
      )}
      <button
        disabled={!isConnected}
        onClick={handleDisconnect}
        className="uppercase text-sm bg-blue-accent hover:bg-angel-blue p-2 text-white"
      >
        disconnect
      </button>
    </div>
  );
}
