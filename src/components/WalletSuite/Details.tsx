import Copier from "components/Copier/Copier";
import { denoms } from "constants/currency";
import { DeviceType, deviceType } from "helpers/deviceType";
import maskAddress from "helpers/maskAddress";
import useWalletContext from "hooks/useWalletContext";
import { Dwindow, TerraIdentifiers } from "providers/WalletProvider";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Filter from "./Filter";
import Holdings from "./Holdings";
import Portal from "./Portal";

const criterionAmount = 0.1;

export default function Details(props: { closeHandler: () => void }) {
  const [filtered, setFilter] = useState(false);
  const { coins, chainId, address, disconnect, availableConnections } =
    useWalletContext();

  const filtered_coins = coins.filter(
    (coin) =>
      filtered ||
      coin.denom === denoms.uusd ||
      coin.denom === denoms.uhalo ||
      Number(coin.amount) > criterionAmount
  );
  const handleFilter = () => setFilter((p) => !p);

  const isEmpty = filtered_coins.length <= 0;

  const isSafePal =
    availableConnections.some(
      (connection) => connection.identifier === TerraIdentifiers.safepal
    ) ||
    (deviceType() === DeviceType.MOBILE && (window as Dwindow).ethereum);

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
      {!isSafePal && (
        <button
          onClick={disconnect}
          className="uppercase text-sm bg-angel-orange hover:text-angel-grey p-2 text-white"
        >
          disconnect
        </button>
      )}
    </div>
  );
}
