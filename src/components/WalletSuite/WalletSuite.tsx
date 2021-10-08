// import { IoWallet } from "react-icons/io5";
import { Changer, Props, Setters, State, Wallets } from "./types";
import { createContext, useContext, useEffect, useState } from "react";

export default function WalletSuite(props: Props) {
  const [activeWallet, setActiveWallet] = useState<Wallets>(Wallets.none);
  const [currWallet, setCurrWallet] = useState<Wallets>(Wallets.none);

  useEffect(() => {
    //reset wallet status on unmount
    return () => setActiveWallet(Wallets.none);
  }, []);

  const changeActiveWallet: Changer = (wallet) => {
    setActiveWallet(wallet);
  };

  const changeCurrWallet: Changer = (wallet) => {
    setCurrWallet(wallet);
  };

  return (
    <setContext.Provider
      value={{
        setActiveWallet: changeActiveWallet,
        setCurrWallet: changeCurrWallet,
      }}
    >
      <getContext.Provider
        value={{
          activeWallet,
          currWallet,
        }}
      >
        {props.children}
      </getContext.Provider>
    </setContext.Provider>
  );
}

const getContext = createContext<State>({
  activeWallet: Wallets.none,
  currWallet: Wallets.none,
});
const setContext = createContext<Setters>({
  setActiveWallet: () => {},
  setCurrWallet: () => {},
});
export const useGetWallet = () => useContext(getContext);
export const useSetWallet = () => useContext(setContext);
