import { StaticWalletProvider } from "@terra-money/wallet-provider";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "store/store";
import { chainIDs } from "constants/chainIDs";
import { terra_lcds } from "constants/urls";

const testnet = {
  name: "bombay",
  chainID: chainIDs.testnet,
  lcd: terra_lcds[chainIDs.testnet],
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
