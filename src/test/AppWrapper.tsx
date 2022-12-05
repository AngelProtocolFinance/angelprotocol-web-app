import {
  NetworkInfo,
  StaticWalletProvider,
} from "@terra-money/wallet-provider";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import ModalContext from "contexts/ModalContext";
import WalletContext from "contexts/WalletContext";
import { store } from "store/store";

const testnet: NetworkInfo = {
  name: "bombay",
  chainID: "pisco-1",
  lcd: "https://pisco-lcd.terra.dev",
  walletconnectID: 0,
};

export default function AppWrapper(props: PropsWithChildren<{}>) {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <ModalContext>
          <StaticWalletProvider defaultNetwork={testnet}>
            <WalletContext>{props.children}</WalletContext>
          </StaticWalletProvider>
        </ModalContext>
      </Provider>
    </MemoryRouter>
  );
}
