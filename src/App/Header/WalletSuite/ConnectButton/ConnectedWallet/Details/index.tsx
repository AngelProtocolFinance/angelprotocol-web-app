import { Popover } from "@headlessui/react";
import { Link } from "react-router-dom";
import { AP_ID, REVIEWER_ID } from "services/juno/custom";
import {
  WalletState,
  useSetWallet,
} from "contexts/WalletContext/WalletContext";
import Copier from "components/Copier";
import { AdminLink } from "components/admin";
import { maskAddress } from "helpers";
import { appRoutes } from "constants/routes";
import Bookmarks from "./Bookmarks";
import Filter from "./Filter";
import Holdings from "./Holdings";

const linkStyle =
  "text-angel-blue hover:text-angel-orange text-sm font-bold font-heading px-3 text-left uppercase";

export default function Details(props: WalletState) {
  const { coins, address, chain } = props;
  const { disconnect } = useSetWallet();

  return (
    <Popover.Panel className="w-60 z-50 grid content-start absolute mt-2 bg-white right-0 rounded-md overflow-hidden shadow-lg">
      <div className="bg-angel-grey text-zinc-50 text-xs p-2">
        <p className="uppercase">network : {chain.chain_name}</p>
      </div>

      <div className="flex gap-2 items-center p-3 pb-0">
        <p className="text-sm text-angel-grey font-mono">
          {maskAddress(address)}
        </p>
        <Copier text={address} colorClass="text-angel-grey text-lg" />
      </div>

      <Link
        to={`${appRoutes.donations}/${props.address}`}
        className={linkStyle + " mt-2"}
      >
        My Donations
      </Link>

      <AdminLink label="admin" className={linkStyle} id={AP_ID} />
      <AdminLink label="applications" className={linkStyle} id={REVIEWER_ID} />

      <Bookmarks />

      <Filter coins={coins} classes="mt-1">
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
