import { StaticWalletProvider } from "@terra-money/wallet-provider";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "store/store";
import { terra_lcds } from "constants/urls";

const testnet = {
  name: "bombay",
  chainID: "bombay-12",
  lcd: terra_lcds["bombay-12"],
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
