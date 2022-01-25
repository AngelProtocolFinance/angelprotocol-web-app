import { useWallet } from "@terra-money/wallet-provider";
import { Coin } from "@terra-money/terra.js";
import { IoClose } from "react-icons/io5";
import Holdings from "./Holdings";
import Address from "./Address";
import Portal from "./Portal";
import { useState } from "react";
import { denoms } from "constants/currency";
import Filter from "./Filter";
import { useGetter } from "store/accessors";

const criterionAmount = 10;
export default function Details(props: { closeHandler: () => void }) {
  const { disconnect } = useWallet();
  const [filtered, setFilter] = useState(false);
  const { coins, chainId, address } = useGetter((state) => state.wallet);
  const filtered_coins = coins.filter(
    (coin) =>
      filtered ||
      coin.denom === denoms.uusd ||
      coin.denom === denoms.uhalo ||
      Number(coin.amount) > criterionAmount
  );
  const handleFilter = () => setFilter((p) => !p);

  const isEmpty = filtered_coins.length <= 0;
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
        <p className="uppercase">network : {chainId}</p>
      </div>
      {!isEmpty && <Filter filtered={filtered} handleFilter={handleFilter} />}
      <Address address={address} />
      <Portal />
      {(!isEmpty && <Holdings coins={filtered_coins} />) || (
        <span className="text-angel-grey p-10 text-center text-sm uppercase">
          Wallet is empty
        </span>
      )}
      <button
        onClick={handleDisconnect}
        className="uppercase text-sm bg-angel-orange hover:text-angel-grey p-2 text-white"
      >
        disconnect
      </button>
    </div>
  );
}
