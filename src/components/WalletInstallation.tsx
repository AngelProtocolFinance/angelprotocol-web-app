import { Dialog } from "@headlessui/react";
import keplrWalletLogo from "assets/icons/wallets/keplr.png";
import { KEPLR_INSTALL_LINK } from "constants/urls";
import Icon from "./Icon";

export default function WalletInstallation() {
  return (
    <Dialog.Panel className="fixed-center z-20 max-w-md outline-none md:w-[90%] w-full md:p-4 p-8 bg-blue-accent rounded-2xl z-50 flex flex-col gap-5">
      <h2 className="text-xl text-white-grey font-bold font-heading">
        Install Wallet
      </h2>
      <a
        className="bg-blue-dark rounded-2xl p-5 flex items-center"
        rel="noreferrer"
        target="_blank"
        href={KEPLR_INSTALL_LINK}
      >
        <img
          src={keplrWalletLogo}
          alt="keplr logo"
          className="w-8 h-8 object-contain"
        />

        <div className="flex flex-col text-left ml-5">
          <div className="flex items-center gap-2 text-white-grey font-bold">
            <h6 className="text-xl font-heading">Install Keplr</h6>
            <Icon type="ExternalLink" size={24} />
          </div>
          <p className="text-grey-accent mt-1">{KEPLR_INSTALL_LINK}</p>
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
