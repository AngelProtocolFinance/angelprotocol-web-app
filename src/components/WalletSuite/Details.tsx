import { useState } from "react";
import {
  useGetWallet,
  useSetWallet,
} from "contexts/WalletContext/WalletContext";
import Backdrop from "components/Backdrop";
import Copier from "components/Copier";
import Icon from "components/Icon";
import maskAddress from "helpers/maskAddress";
import { denoms } from "constants/currency";
import Filter from "./Filter";
import Holdings from "./Holdings";
import Portal from "./Portal";

const criterionAmount = 0.1;
export default function Details(props: { closeHandler: () => void }) {
  const { coins, chainId, address } = useGetWallet();
  const { disconnect } = useSetWallet();
  const [filtered, setFilter] = useState(false);

  const filtered_coins = coins.filter(
    (coin) =>
      filtered ||
      coin.min_denom === denoms.wei ||
      Number(coin.balance) > criterionAmount
  );
  const handleFilter = () => setFilter((p) => !p);
  const isEmpty = filtered_coins.length <= 0;

  return (
    <>
      <Backdrop
        classes="z-10 fixed inset-0"
        customCloseHandler={props.closeHandler}
      />
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
        <Portal address={address} />
        {(!isEmpty && <Holdings coins={filtered_coins} />) || (
          <span className="text-angel-grey p-10 text-center text-sm uppercase">
            Wallet is empty
          </span>
        )}
        <button
          onClick={disconnect}
          className="uppercase text-sm bg-angel-orange hover:text-angel-grey p-2 text-white"
        >
          disconnect
        </button>
      </div>
    </>
  );
}
