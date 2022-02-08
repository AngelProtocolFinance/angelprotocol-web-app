import { useWallet } from "@terra-money/wallet-provider";
import Copier from "components/Copier/Copier";
import { denoms } from "constants/currency";
import { useGetter, useSetter } from "store/accessors";
import { resetWallet } from "services/wallet/walletSlice";
import maskAddress from "helpers/maskAddress";
import { IoClose } from "react-icons/io5";
import Holdings from "./Holdings";
import Portal from "./Portal";
import { useState } from "react";
import Filter from "./Filter";

const criterionAmount = 0.1;
export default function Details(props: { closeHandler: () => void }) {
  const { disconnect } = useWallet();
  const dispatch = useSetter();
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
  const handleDisconnect = () => {
    disconnect();
    dispatch(resetWallet());
  };

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
      <div className="flex gap-2 items-center p-2  pb-0">
        <p className="text-xl text-angel-grey">{maskAddress(address)}</p>
        <Copier text={address} colorClass="text-angel-grey text-lg" />
      </div>
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
