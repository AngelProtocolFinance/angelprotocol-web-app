import {
  NetworkInfo,
  StaticWalletProvider,
} from "@terra-money/wallet-provider";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "store/store";
import { chainIds } from "constants/chainIDs";

const testnet: NetworkInfo = {
  name: "bombay",
  chainID: chainIds.terra,
  lcd: "https://pisco-lcd.terra.dev",
  walletconnectID: 0,
};

export default function AppWrapper(
  props: PropsWithChildren<{ routes: string[]; startingRouteIndex: number }>
) {
  return (
    <MemoryRouter initialEntries={props.routes} initialIndex={0}>
      <Provider store={store}>
        <StaticWalletProvider defaultNetwork={testnet}>
          {props.children}
        </StaticWalletProvider>
      </Provider>
    </MemoryRouter>
  );
}
