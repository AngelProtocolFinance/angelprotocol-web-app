// import { IoWallet } from "react-icons/io5";
import { Changer, Props, Wallets } from "./types";
import { createContext, useContext, useEffect, useState } from "react";

export default function WalletSuite(props: Props) {
  const [activeWallet, setActiveWallet] = useState<Wallets>(Wallets.none);

  useEffect(() => {
    //reset wallet status on unmount
    return () => setActiveWallet(Wallets.none);
  }, []);

  const changeActiveWallet: Changer = (wallet) => {
    setActiveWallet(wallet);
  };

  return (
    <setContext.Provider value={changeActiveWallet}>
      <getContext.Provider value={activeWallet}>
        {props.children}
      </getContext.Provider>
    </setContext.Provider>
  );
}

const getContext = createContext<Wallets>(Wallets.none);
const setContext = createContext<Changer>(() => {});
export const useGetWallet = () => useContext(getContext);
export const useSetWallet = () => useContext(setContext);
