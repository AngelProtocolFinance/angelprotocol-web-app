// import { IoWallet } from "react-icons/io5";
import { Props, State, Wallets } from "./types";
import { createContext, useContext } from "react";
import Nodal from "components/Nodal/Nodal";
import useWalletSuite from "./useWalletSuite";

export default function WalletSuite(props: Props) {
  const { isLoading, activeWallet } = useWalletSuite();

  return (
    <getContext.Provider value={{ activeWallet, isLoading }}>
      <Nodal classes="">{props.children}</Nodal>
    </getContext.Provider>
  );
}

const getContext = createContext<State>({
  activeWallet: Wallets.none,
  isLoading: false,
});

export const useGetState = () => useContext(getContext);
