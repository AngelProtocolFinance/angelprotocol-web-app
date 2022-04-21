import { WalletStatus } from "@terra-money/wallet-provider";
import { renderHook } from "@testing-library/react-hooks";
import OpenLogin from "@toruslabs/openlogin";
import { TORUS_CONNECTION } from "../types";
import useTorusWallet from "../useTorusWallet";

// jest.mock("@toruslabs/openlogin");
// jest.mock("@toruslabs/openlogin", () => {
//   return jest.fn().mockImplementation(() => {
//     return {
//       init() {},
//       async login(props?: { loginProvider: string }) {},
//       async logout() {},
//     };
//   });
// })

describe("useTorusWallet initializes correctly", () => {
  it("should return default values when wallet not connected", async () => {
    const initOpenLoginMock = jest
      .spyOn(OpenLogin.prototype, "init")
      .mockImplementation(async () => {});

    const { result, waitForValueToChange } = renderHook(() => useTorusWallet());

    expect(result.current.status).toBe(WalletStatus.INITIALIZING);

    await waitForValueToChange(() => result.current.status);

    const { status, availableWallets, wallet } = result.current;
    expect(initOpenLoginMock).toHaveBeenCalled();
    expect(status).toBe(WalletStatus.WALLET_NOT_CONNECTED);
    expect(availableWallets).toHaveLength(1);
    expect(availableWallets[0].connection).toBe(TORUS_CONNECTION);
    expect(availableWallets[0].address).toBe("");
    expect(wallet).toBeUndefined();
  });
});
