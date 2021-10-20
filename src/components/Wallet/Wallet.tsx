import { useWallet } from "@terra-money/wallet-provider";
import useCopyAddress from "./useCopyAddress";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiCopy, BiCheck } from "react-icons/bi";
import { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { app } from "types/routes";
import useUSTBalance from "hooks/useUSTBalance";
import toCurrency from "helpers/toCurrency";
import WithdrawButton from "./WithdrawButton";
import Withdraw from "../../pages/Withdraw/Withdraw";

export default function Wallet() {
  //since this is under WALLET_CONNECTED status --> wallet guaranteed to be defined
  const { path } = useRouteMatch();
  const [isAddressCopiedIcon, setIsAddressCopiedIcon] = useState(false);
  const [isAddressCopiedButton, setIsAddressCopiedButton] = useState(false);
  const { buttonProps, isOpen, handleCopy } = useCopyAddress();
  const { wallets, disconnect } = useWallet();
  const wallet = wallets[0];
  const address = wallet.terraAddress;
  const ustBalance = useUSTBalance();

  function backToDefault(type: string) {
    if (type === "icon") {
      setIsAddressCopiedIcon(false);
    } else {
      setIsAddressCopiedButton(false);
    }
  }

  return (
    <div className={`flex justify-between items-center`}>
      <p className={`text-sm md:tex-base text-white border-r pr-1 uppercase`}>
        UST {toCurrency(ustBalance)}
      </p>
      <p className={`pl-1 text-sm md:tex-base text-white`}>
        {address.substr(0, 15) + "..."}
      </p>
      <button
        className="mx-2"
        onClick={() => {
          setIsAddressCopiedIcon(true);
          handleCopy(address)();
          setTimeout(backToDefault, 4000, "icon");
        }}
      >
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
            onClick={() => {
              setIsAddressCopiedButton(true);
              handleCopy(address)();
              setTimeout(backToDefault, 4000, "button");
            }}
          >
            {isAddressCopiedButton ? `Copied!` : `Copy Address`}
          </button>
          <WithdrawButton />
          <Switch>
            <Route path={`${path}${app.withdraw}`} component={Withdraw} />
          </Switch>
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
