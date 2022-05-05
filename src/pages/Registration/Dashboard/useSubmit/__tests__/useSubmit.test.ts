import { CreateTxOptions } from "@terra-money/terra.js";
import { renderHook } from "@testing-library/react-hooks";
import { WalletProxy } from "providers/WalletProvider";
import { chainOptions } from "providers/WalletProvider/chainOptions";
import { TORUS_CONNECTION } from "providers/WalletProvider/useWalletContext/types";
import useSubmit from "../useSubmit";

jest.mock("../useTransactionResultHandler");

const mockUseWalletContext = jest.fn();

jest.mock("hooks/useWalletContext", () => ({
  __esModule: true,
  default: () => mockUseWalletContext(),
}));

const mockShowModal = jest.fn();

jest.mock("components/ModalContext/ModalContext", () => ({
  __esModule: true,
  useModalContext: () => ({ showModal: mockShowModal }),
}));

const mockUseGetter = jest.fn();
const mockUseSetter = jest.fn();

jest.mock("store/accessors", () => ({
  __esModule: true,
  useGetter: (..._: any[]) => mockUseGetter(),
  useSetter: () => mockUseSetter(),
}));

describe("useSubmit tests", () => {
  afterAll(() => {
    jest.unmock("hooks/useWalletContext");
    jest.unmock("components/ModalContext/ModalContext");
    jest.unmock("store/accessors");
    jest.unmock("../useTransactionResultHandler");
  });

  it("initializes correctly", () => {
    mockUseGetter.mockReturnValue({ form_loading: false });
    mockUseWalletContext.mockReturnValue({ wallet });
    const { result } = renderHook(() => useSubmit());

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submit).toBeDefined();
  });
});

const wallet: WalletProxy = {
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
