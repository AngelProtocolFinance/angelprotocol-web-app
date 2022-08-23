import { Popover } from "@headlessui/react";
import { Link } from "react-router-dom";
import { WalletInfo, useWalletContext } from "contexts/Wallet";
import Copier from "components/Copier";
import { maskAddress } from "helpers";
import { appRoutes } from "constants/routes";
import Filter from "./Filter";
import Holdings from "./Holdings";

export default function Details({ address }: WalletInfo) {
  const { disconnect } = useWalletContext();

  return (
    <Popover.Panel className="w-max z-50 grid content-start absolute mt-2 bg-white right-0 rounded-md overflow-hidden shadow-lg">
      {/* <div className="bg-angel-grey text-zinc-50 text-xs p-2">
        <p className="uppercase">network : {chain.chain_name}</p>
      </div> */}
      <p>fetch balances when user opens this</p>

      <div className="flex gap-2 items-center p-3 pb-0">
        <p className="text-sm text-angel-grey font-mono">
          {maskAddress(address)}
        </p>
        <Copier text={address} colorClass="text-angel-grey text-lg" />
      </div>

      <Link
        to={`${appRoutes.donations}/${address}`}
        className="text-angel-blue hover:text-angel-orange text-xs font-bold font-heading px-3 text-left mt-2 mb-4"
      >
        MY DONATIONS
      </Link>
      <Filter
        coins={
          [
            /** todo: fetch balance here */
          ]
        }
      >
        {(filtered) => <Holdings coins={filtered} />}
      </Filter>

      <button
        onClick={disconnect}
        className="mt-4 uppercase text-sm bg-angel-orange hover:text-angel-grey p-2 text-white"
      >
        disconnect
      </button>
    </Popover.Panel>
  );
}
