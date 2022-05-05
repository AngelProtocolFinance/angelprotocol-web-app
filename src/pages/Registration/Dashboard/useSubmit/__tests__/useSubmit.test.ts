import { CreateTxOptions } from "@terra-money/terra.js";
import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { Charity } from "services/aws/types";
import { Step } from "services/transaction/types";
import { WalletProxy } from "providers/WalletProvider";
import { chainOptions } from "providers/WalletProvider/chainOptions";
import { TORUS_CONNECTION } from "providers/WalletProvider/useWalletContext/types";
import useSubmit from "../useSubmit";

const mockShowModal = jest.fn();

jest.mock("components/ModalContext/ModalContext", () => ({
  __esModule: true,
  useModalContext: () => ({ showModal: mockShowModal }),
}));

jest.mock("helpers/processEstimateError", () => ({
  __esModule: true,
  default: (_: any) => {},
}));

const mockUseWalletContext = jest.fn();

jest.mock("hooks/useWalletContext", () => ({
  __esModule: true,
  default: () => mockUseWalletContext(),
}));

const mockDispatch = jest.fn();
const mockUseGetter = jest.fn();

jest.mock("store/accessors", () => ({
  __esModule: true,
  useGetter: (..._: any[]) => mockUseGetter(),
  useSetter: () => mockDispatch,
}));

const mockCreateEndowmentCreationMsg = jest.fn();

jest.mock("../createEndowmentCreationMsg", () => ({
  __esModule: true,
  default: () => mockCreateEndowmentCreationMsg(),
}));

jest.mock("../useTransactionResultHandler");

describe("useSubmit tests", () => {
  afterAll(() => {
    jest.unmock("components/ModalContext/ModalContext");
    jest.unmock("helpers/processEstimateError");
    jest.unmock("hooks/useWalletContext");
    jest.unmock("store/accessors");
    jest.unmock("../createEndowmentCreationMsg");
    jest.unmock("../useTransactionResultHandler");
  });

  it("initializes correctly", () => {
    mockUseGetter.mockReturnValue({ form_loading: false });
    mockUseWalletContext.mockReturnValue({ wallet });

    const { result } = renderHook(() => useSubmit());

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submit).toBeDefined();
  });

  it("assigns 'isSubmitting' value correctly", () => {
    mockUseGetter.mockReturnValue({ form_loading: true });
    mockUseWalletContext.mockReturnValue({ wallet });

    const { result } = renderHook(() => useSubmit());

    expect(result.current.isSubmitting).toBe(true);
  });

  it("sets the Stage to 'error' Step when wallet not connected", async () => {
    mockUseGetter.mockReturnValue({ form_loading: false });
    mockUseWalletContext.mockReturnValue({ wallet: undefined });

    const { result } = renderHook(() => useSubmit());

    await act(() => result.current.submit(charity));

    expect(mockShowModal).toBeCalled();
    expect(mockDispatch).toBeCalledWith({
      type: "transaction/setStage",
      payload: {
        step: Step.error,
        message: "Wallet is not connected",
      },
    });
  });

  it("handles thrown errors", async () => {
    mockUseGetter.mockReturnValue({ form_loading: false });
    mockUseWalletContext.mockReturnValue({ wallet });
    mockCreateEndowmentCreationMsg.mockImplementation((..._: any[]) => {
      throw "error";
    });

    const { result } = renderHook(() => useSubmit());

    await act(() => result.current.submit(charity));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "transaction/setFormLoading",
      payload: true,
    });
    expect(mockDispatch).toBeCalledWith({
      type: "transaction/setStage",
      payload: {
        step: Step.error,
        message:
          "An error occured. Please try again and if the error persists after two failed attempts, please contact support@angelprotocol.io",
      },
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "transaction/setFormLoading",
      payload: false,
    });
    expect(mockShowModal).toBeCalled();
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

const charity: Charity = {
  ContactPerson: {
    Email: "test@test.com",
    EmailVerified: true,
    FirstName: "first",
    LastName: "last",
    PhoneNumber: "+114323888",
    Role: "ceo",
    PK: "7fe792be-5132-4f2b-b37c-4bcd9445b773",
  },
  Registration: {
    CharityName: "charity",
    CharityName_ContactEmail: "CHARITY_test@test.com",
    RegistrationDate: "2022-05-04T10:10:10Z",
    RegistrationStatus: "Inactive",
    Website: "www.test.com",
    UN_SDG: 0,
    ProofOfIdentity: { name: "poi", publicUrl: "https://www.storage.path/poi" },
    ProofOfRegistration: {
      name: "por",
      publicUrl: "https://www.storage.path/por",
    },
    Tier: 1,
    FinancialStatements: [],
    AuditedFinancialReports: [],
    ProofOfIdentityVerified: false,
    ProofOfRegistrationVerified: false,
    FinancialStatementsVerified: false,
    AuditedFinancialReportsVerified: false,
  },
  Metadata: {
    Banner: { name: "banner", publicUrl: "https://www.storage.path/banner" },
    CharityLogo: { name: "logo", publicUrl: "https://www.storage.path/logo" },
    CharityOverview: "some overview",
    EndowmentContract: "",
    TerraWallet: "terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
  },
};
