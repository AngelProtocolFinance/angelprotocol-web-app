import {
  NetworkInfo,
  StaticWalletProvider,
} from "@terra-money/wallet-provider";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "store/store";
import { chainIDs } from "constants/chainIDs";
import { terra_lcds } from "constants/urls";

const testnet: NetworkInfo = {
  name: "bombay",
  chainID: chainIDs.terra_test,
  lcd: terra_lcds[chainIDs.terra_test],
  walletconnectID: 0,
};

export default function AppWrapper(props: PropsWithChildren<{}>) {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <StaticWalletProvider defaultNetwork={testnet}>
          {props.children}
        </StaticWalletProvider>
      </Provider>
    </MemoryRouter>
  );
}
