import { useWallet } from "@terra-money/wallet-provider";
import useCopyAddress from "./useCopyAddress";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiCopy } from "react-icons/bi";
import { useHeaderColors } from "contexts/HeaderColorProvider";

export default function Wallet() {
  //since this is under WALLET_CONNECTED status --> wallet guaranteed to be defined
  const { textColor } = useHeaderColors();
  const { buttonProps, isOpen, handleCopy } = useCopyAddress();
  const { wallets, disconnect } = useWallet();
  const wallet = wallets[0];
  const address = wallet.terraAddress;

  return (
    <div
      className={`flex justify-between items-center ml-1 border border-${textColor} py-1 px-2 rounded-md`}
    >
      <p className={`text-sm md:tex-base text-${textColor}`}>
        {address.substr(0, 15) + "..."}
      </p>
      <button className="mx-2" onClick={handleCopy(address)}>
        <BiCopy className={`text-${textColor}`} />
      </button>
      <div className="flex justify-between items-center relative">
        <button {...buttonProps}>
          <FiMoreHorizontal className={`text-${textColor}`} />
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
            className="uppercase bg-thin-blue rounded-xl w-40 h-6 d-flex justify-center items-center text-sm text-white mb-1"
            onClick={handleCopy(address)}
          >
            Copy Address
          </button>
          <button className="uppercase bg-thin-blue rounded-xl w-40 h-6 d-flex justify-center items-center text-sm text-white mb-1">
            send
          </button>
          <button
            className="uppercase bg-orange rounded-xl w-40 h-6 d-flex justify-center items-center text-sm text-white mb-1"
            onClick={disconnect}
          >
            Disconnect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
