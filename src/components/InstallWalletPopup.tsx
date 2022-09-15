import { Dialog } from "@headlessui/react";
import { ProviderId } from "contexts/WalletContext/types";
import { WALLET_METADATA } from "contexts/WalletContext/constants";
import Icon from "./Icon";

export default function InstallWalletPopup(props: { providerId: ProviderId }) {
  const { installUrl, logo, name } = WALLET_METADATA[props.providerId];

  return (
    <Dialog.Panel className="fixed-center z-20 max-w-md outline-none md:w-[90%] w-full md:p-5 p-8 bg-blue-accent rounded-2xl z-50 flex flex-col gap-5">
      <h2 className="text-xl text-white-grey font-bold font-heading">
        Install Wallet
      </h2>
      <a
        className="bg-blue-dark rounded-2xl p-5 flex items-center"
        rel="noreferrer"
        target="_blank"
        href={installUrl}
      >
        <img src={logo} alt="keplr logo" className="w-12 h-12 object-contain" />

        <div className="flex flex-col text-left ml-5">
          <div className="flex items-center gap-2 text-white-grey font-bold">
            <h6 className="text-xl font-heading">Install {name}</h6>
            <Icon type="ExternalLink" size={24} />
          </div>
          <p className="text-grey-accent mt-1 truncate w-72">{installUrl}</p>
        </div>
      </a>
      <div className="p-5 rounded-2xl bg-thin-blue">
        <p className="text-white/70 text-sm">
          You may need to refresh the page once you have downloaded the wallet.
        </p>
      </div>
    </Dialog.Panel>
  );
}
