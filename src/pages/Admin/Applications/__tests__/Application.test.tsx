/* eslint-disable testing-library/no-debugging-utils */
import { CreateTxOptions } from "@terra-money/terra.js";
import { StaticWalletProvider } from "@terra-money/wallet-provider";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "App/App";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import icon from "assets/icons/wallets/unknown.svg";
import Admin from "pages/Admin/Admin";
import Market from "pages/Market/Market";
import { State } from "services/wallet/types";
import { WalletProxy } from "providers/WalletProvider";
import { chainOptions } from "providers/WalletProvider/chainOptions";
import { TORUS_CONNECTION } from "providers/WalletProvider/useWalletContext/types";
import { store } from "store/store";
import { chainIDs } from "constants/chainIDs";
import { denoms } from "constants/currency";
import { admin, app, site } from "constants/routes";
import { terra_lcds } from "constants/urls";
import Applications from "../Applications";

const testnet = {
  name: "bombay",
  chainID: chainIDs.testnet,
  lcd: terra_lcds[chainIDs.testnet],
};

function AppWrapper(
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

const routes = [
  `${site.app}`,
  `${site.app}`,
  `${site.app}/${app.admin}`,
  `${site.app}/${app.admin}/${admin.charity_applications}`,
];

const TestAdminApp = () => (
  <AppWrapper routes={routes} startingRouteIndex={3}>
    <Routes>
      <Route path={routes[1]} element={<App />}>
        <Route path={`${routes[1]}${app.marketplace}`} element={<Market />} />
        <Route path={`${routes[1]}${app.admin}`} element={<Admin />}>
          <Route
            path={`${routes[1]}/${app.admin}/${admin.charity_applications}`}
            element={<Applications />}
          />
        </Route>
      </Route>
    </Routes>
  </AppWrapper>
);

const mockUseWalletContext = jest.fn();
jest.mock("hooks/useWalletContext", () => ({
  __esModule: true,
  default: () => mockUseWalletContext(),
}));

const mockUseSetter = jest.fn();
const mockUseGetter = jest.fn();
jest.mock("store/accessors", () => ({
  useSetter: () => mockUseSetter,
  useGetter: () => mockUseGetter(),
}));

describe("Test Charity applications review", () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
    (window.scrollTo as jest.Mock).mockImplementation(
      (options: ScrollToOptions) => {}
    );
  });

  test("Charity application review renders correctly", async () => {
    mockUseWalletContext.mockReturnValue({ wallet: WALLET });
    mockUseGetter.mockReturnValue({ cwContracts: "apTeam", ...walletState });

    render(<TestAdminApp />);
    // await waitForElementToBeRemoved(() => screen.queryByTestId("loader"));
    screen.debug();
  });
});

const WALLET: WalletProxy = {
  connection: TORUS_CONNECTION,
  address: "terra1tc2yp07pce93uwnneqr0cptqze6lvke9edal3l",
  network: chainOptions.walletConnectChainIds[0], // testnet
  post: async (_: CreateTxOptions) => ({
    result: {
      height: 1,
      raw_log: "",
      txhash: "",
    },
    success: true,
    msgs: [],
  }),
  connect: async (..._: any[]) => {},
  disconnect: async () => {},
};

const walletState: State = {
  isUpdating: false,
  displayCoin: {
    amount: 0,
    denom: denoms.uusd,
  },
  coins: [],
  icon: icon,
  address: "terra1tc2yp07pce93uwnneqr0cptqze6lvke9edal3l",
  supported_denoms: [],
  id: undefined,
  chainId: chainIDs.mainnet,
};
