import { useWallet } from "@terra-money/wallet-provider";
import Copier from "components/Copier/Copier";
import { denoms } from "constants/currency";
import { useGetter, useSetter } from "store/accessors";
import { resetWallet } from "services/wallet/walletSlice";
import maskAddress from "helpers/maskAddress";
import Holdings from "./Holdings";
import Portal from "./Portal";
import { useState } from "react";
import Filter from "./Filter";
import { useSetMetamask } from "providers/Metamask/Metamask";
import Icon from "components/Icons/Icons";
import { Dwindow, Providers } from "services/provider/types";
import { TerraIdentifiers } from "services/wallet/types";
import { DeviceType, deviceType } from "helpers/deviceType";

const criterionAmount = 0.1;
export default function Details(props: { closeHandler: () => void }) {
  const dispatch = useSetter();
  const { active: activeProvider } = useGetter((state) => state.provider);
  const { disconnect: disconnectTerra, availableConnections } = useWallet();
  const { disconnect: disconnectMetamask } = useSetMetamask();

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
    dispatch(resetWallet());
    if (activeProvider === Providers.terra) {
      disconnectTerra();
    }
    if (activeProvider === Providers.ethereum) {
      disconnectMetamask();
    }
  };

  const isSafePal =
    availableConnections.some(
      (connection) => connection.identifier === TerraIdentifiers.safepal
    ) ||
    (deviceType() === DeviceType.MOBILE && (window as Dwindow).ethereum);

  return (
    <div className="w-max z-50 grid grid-rows-a1a absolute top-full mt-2 bg-white w-full right-0 rounded-md overflow-hidden shadow-lg">
      <button
        className="text-white absolute top-2 right-2"
        onClick={props.closeHandler}
      >
        <Icon type="Close" />
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
          onClick={handleDisconnect}
          className="uppercase text-sm bg-angel-orange hover:text-angel-grey p-2 text-white"
        >
          disconnect
        </button>
      )}
    </div>
  );
}
