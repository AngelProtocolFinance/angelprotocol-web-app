import { Dialog } from "@headlessui/react";
import { ProviderId } from "contexts/WalletContext/types";
import { WALLET_METADATA } from "contexts/WalletContext/constants";
import Icon from "./Icon";

export default function InstallWalletPopup(props: { providerId: ProviderId }) {
  const { installUrl, logo, name } = WALLET_METADATA[props.providerId];

  return (
    <Dialog.Panel className="flex flex-col gap-5 fixed-center z-20 max-w-md outline-none w-[90%] p-5 bg-blue-d1 rounded-2xl">
      <h2 className="text-lg md:text-xl text-white font-bold font-heading">
        Install Wallet
      </h2>
      <a
        className="bg-blue-d3 hover:bg-blue rounded-2xl p-3 md:p-5 flex items-center"
        rel="noreferrer"
        target="_blank"
        href={installUrl}
      >
        <img
          src={logo}
          alt="wallet logo"
          className="w-8 h-8 md:w-12 md:h-12 object-contain"
        />

        <div className="flex flex-col text-left ml-3 md:ml-5">
          <div className="flex items-center gap-2 text-white font-bold">
            <h6 className="text-base md:text-lg font-heading">
              Install {name}
            </h6>
            <Icon type="ExternalLink" size={20} />
          </div>
          <p className="text-sm md:text-base text-grey-accent mt-1 truncate w-40 md:w-72">
            {installUrl}
          </p>
        </div>
      </a>
      <div className="p-3 md:p-5 rounded-2xl bg-blue">
        <p className="text-white/70 text-xs md:text-sm">
          You may need to refresh the page once you have downloaded the wallet.
        </p>
      </div>
    </Dialog.Panel>
  );
}
