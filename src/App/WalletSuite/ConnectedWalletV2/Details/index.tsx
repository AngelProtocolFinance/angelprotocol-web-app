import { Popover } from "@headlessui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AP_ID } from "services/juno/custom";
import { WalletState } from "contexts/WalletContext";
import ContentLoader from "components/ContentLoader";
import { AdminLink } from "components/admin";

export default function Details(props: WalletState) {
  return (
    <Popover.Panel className="absolute top-2 right-0 grid bg-white rounded-lg border border-gray-l2 shadow-[0_0_16px_rgba(15,46,67,0.25)] text-gray-d2">
      <div className="grid p-4 gap-3 border-b border-gray-l2">
        <h3 className="font-heading font-bold text-sm text-gray-d1">
          My Endowment
        </h3>
        <div className="flex gap-3">
          <Logo logo={""} />
          <div className="grid">
            <span className="font-heading font-semibold text-sm">
              {"endowment name"}
            </span>
            <div className="flex items-center uppercase font-heading font-semibold text-xs underline text-orange">
              <Link to={""} className="pr-1 border-r border-gray-l2">
                profile
              </Link>
              <AdminLink label="admin" className="pl-1" id={AP_ID} />
            </div>
          </div>
        </div>
      </div>
    </Popover.Panel>
  );
}

function Logo({ logo }: { logo: string }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      {isLoading && <ContentLoader className="w-10 h-10 rounded" />}
      <img
        src={logo}
        className={`w-10 h-10 object-contain border border-gray-l2 rounded-full ${
          isLoading ? "hidden" : ""
        }`}
        alt=""
        onLoad={() => setLoading(false)}
      />
    </>
  );
}
