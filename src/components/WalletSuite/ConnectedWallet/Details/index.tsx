import { Popover } from "@headlessui/react";
import { Link } from "react-router-dom";
import { AP_ID, REVIEWER_ID } from "services/juno/custom";
import { Wallet, useWalletContext } from "contexts/WalletContext";
import Copier from "components/Copier";
import { maskAddress } from "helpers";
import { appRoutes } from "constants/routes";
import AdminLink from "./AdminLink";

export default function Details({ address }: Wallet) {
  const { disconnect } = useWalletContext();

  const linkStyle =
    "text-angel-blue hover:text-angel-orange text-sm font-bold font-heading px-3 text-left uppercase mb-2";

  return (
    <Popover.Panel className="w-max z-50 grid content-start absolute mt-2 bg-white right-0 rounded-md overflow-hidden shadow-lg">
      <div className="flex gap-2 items-center p-3 pb-0">
        <p className="text-sm text-angel-grey font-mono">
          {maskAddress(address)}
        </p>
        <Copier text={address} colorClass="text-angel-grey text-lg" />
      </div>

      <Link
        to={`${appRoutes.donations}/${address}`}
        className={linkStyle + " mt-4"}
      >
        MY DONATIONS
      </Link>
      <AdminLink label="Admin" className={linkStyle} id={AP_ID} />
      <AdminLink label="Applications" className={linkStyle} id={REVIEWER_ID} />

      <button
        onClick={disconnect}
        className="mt-4 uppercase text-sm bg-angel-orange hover:text-angel-grey p-2 text-white"
      >
        disconnect
      </button>
    </Popover.Panel>
  );
}
