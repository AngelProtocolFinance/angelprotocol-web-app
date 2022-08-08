import { Popover } from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  WalletState,
  useSetWallet,
} from "contexts/WalletContext/WalletContext";
import Copier from "components/Copier";
import maskAddress from "helpers/maskAddress";
import { appRoutes } from "constants/routes";
import Filter from "./Filter";
import Holdings from "./Holdings";

export default function Details(props: WalletState) {
  const { coins, displayCoin, address } = props;
  const { disconnect } = useSetWallet();

  return (
    <Popover.Panel className="w-max z-50 grid grid-rows-a1a absolute top-full mt-2 bg-white w-full right-0 rounded-md overflow-hidden shadow-lg">
      <div className="bg-angel-grey text-white-grey text-xs p-2 pt-0">
        <p className="uppercase">network : {displayCoin.chain_name}</p>
      </div>

      <div className="flex gap-2 items-center p-2  pb-0">
        <p className="text-xl text-angel-grey">{maskAddress(address)}</p>
        <Copier text={address} colorClass="text-angel-grey text-lg" />
      </div>

      <Link
        to={`${appRoutes.donations}/${props.address}`}
        className="text-angel-blue hover:text-angel-orange text-xs font-bold font-heading pl-2 mt-2"
      >
        MY DONATIONS
      </Link>
      <Filter coins={coins}>
        {(filtered) => <Holdings coins={filtered} />}
      </Filter>

      <button
        onClick={disconnect}
        className="uppercase text-sm bg-angel-orange hover:text-angel-grey p-2 text-white"
      >
        disconnect
      </button>
    </Popover.Panel>
  );
}
