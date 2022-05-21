import { CreateTxOptions } from "@terra-money/terra.js";
import { WalletStatus } from "@terra-money/wallet-provider";
import { renderHook } from "@testing-library/react-hooks";
import OpenLogin from "@toruslabs/openlogin";
import { TORUS_CONNECTION } from "../types";
import { WalletProxy } from "providers/WalletProvider/types";
import { chainOptions } from "providers/WalletProvider/chainOptions";
import createWalletProxy from "../createWalletProxy";
import useTorusWallet from "../useTorusWallet";

jest.mock("../createWalletProxy");

const mockWalletProxy: WalletProxy = {
  connection: TORUS_CONNECTION,
  address: "terra1ke4aktw6zvz2jxsyqx55ejsj7rmxdl9p5xywus",
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

const PRIV_KEY =
  "111e0a0224d92b1142c962360aa8cda9355d07ed6483551fcbeb64017e708ff5";

const mockInit = jest
  .spyOn(OpenLogin.prototype, "init")
  .mockImplementation(async () => {});

describe("useTorusWallet initializes correctly", () => {
  beforeEach(() => {
    mockInit.mockClear();
  });

  it("should return default values when wallet not connected", async () => {
    const { result, waitForValueToChange } = renderHook(() => useTorusWallet());

    expect(result.current.status).toBe(WalletStatus.INITIALIZING);

    await waitForValueToChange(() => result.current.status);

    const { status, availableWallets, wallet } = result.current;
    expect(mockInit).toHaveBeenCalledTimes(1);
    expect(status).toBe(WalletStatus.WALLET_NOT_CONNECTED);
    expect(availableWallets).toHaveLength(1);
    expect(availableWallets[0].connection).toBe(TORUS_CONNECTION);
    expect(availableWallets[0].address).toBe("");
    expect(wallet).toBeUndefined();
  });

  it("should return wallet when connected", async () => {
    (createWalletProxy as jest.Mock).mockImplementation(() => mockWalletProxy);
    jest
      .spyOn(OpenLogin.prototype, "privKey", "get")
      .mockImplementation(() => PRIV_KEY);
    const { result, waitForValueToChange } = renderHook(() => useTorusWallet());

    expect(result.current.status).toBe(WalletStatus.INITIALIZING);

    await waitForValueToChange(() => result.current.status);

    const { status, availableWallets, wallet } = result.current;
    expect(mockInit).toHaveBeenCalledTimes(1);
    expect(status).toBe(WalletStatus.WALLET_CONNECTED);
    expect(availableWallets).toHaveLength(1);
    expect(availableWallets[0].connection).toBe(TORUS_CONNECTION);
    expect(availableWallets[0].address).toBe(mockWalletProxy.address);
    expect(wallet).toBeDefined();
  });
});
