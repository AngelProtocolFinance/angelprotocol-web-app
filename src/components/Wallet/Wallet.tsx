import { useWallet } from "@terra-money/wallet-provider";
import useCopyAddress from "./useCopyAddress";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiCopy, BiCheck } from "react-icons/bi";
import { useState } from "react";

export default function Wallet() {
  //since this is under WALLET_CONNECTED status --> wallet guaranteed to be defined
  const [isAddressCopiedIcon, setIsAddressCopiedIcon] = useState(false);
  const [isAddressCopiedButton, setIsAddressCopiedButton] = useState(false);
  const { buttonProps, isOpen, handleCopy } = useCopyAddress();
  const { wallets, disconnect } = useWallet();
  const wallet = wallets[0];
  const address = wallet.terraAddress;

  function handleCopyIcon() {
    setIsAddressCopiedIcon(true);
    handleCopy(address)();
    setTimeout(backToDefault, 4000);
  }

  function handleCopyButton() {
    setIsAddressCopiedButton(true);
    handleCopy(address)();
    setTimeout(backToDefault, 4000);
  }

  function backToDefault() {
    setIsAddressCopiedIcon(false);
    setIsAddressCopiedButton(false);
  }

  return (
    <div
      className={`flex justify-between items-center ml-1 border border-white py-1 px-2 rounded-md`}
    >
      <p className={`text-sm md:tex-base text-white`}>
        {address.substr(0, 15) + "..."}
      </p>
      <button className="mx-2" onClick={handleCopyIcon}>
        {isAddressCopiedIcon ? (
          <BiCheck
            className="text-white hover:text-orange cursor-default"
            title="Copied!"
          />
        ) : (
          <BiCopy
            className="text-white hover:text-orange"
            title="Copy Address"
          />
        )}
      </button>
      <div className="flex justify-between items-center relative">
        <button {...buttonProps}>
          <FiMoreHorizontal
            className="text-white hover:text-orange"
            title="More Options"
          />
        </button>
        <div
          className={
            isOpen
              ? "block px-5 py-3 absolute right-0 top-8 bg-white text-black rounded-md z-50 shadow-xl"
              : "hidden px-5 py-3 absolute right-0 top-8 bg-white text-black rounded-md z-50"
          }
          role="menu"
        >
          <h3 className="text-base text-thin-blue mb-1 text-center">
            {address.substr(0, 15) + "..."}
          </h3>
          <button
            className="uppercase hover:bg-angel-blue bg-thin-blue rounded-xl w-40 h-6 d-flex justify-center items-center text-sm text-white mb-1"
            onClick={handleCopyButton}
          >
            {isAddressCopiedButton ? `Copied!` : `Copy Address`}
          </button>
          <button className="uppercase hover:bg-angel-blue bg-thin-blue rounded-xl w-40 h-6 d-flex justify-center items-center text-sm text-white mb-1">
            send
          </button>
          <button
            className="uppercase hover:bg-angel-orange bg-orange rounded-xl w-40 h-6 d-flex justify-center items-center text-sm text-white mb-1"
            onClick={disconnect}
          >
            Disconnect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
