import { MsgExecuteContract } from "@terra-money/terra.js";
import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { Charity } from "types/server/aws";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { placeHolderDisplayToken } from "contexts/WalletContext/constants";
import Registrar from "contracts/Registrar";
import { chainIDs } from "constants/chainIDs";
import useSubmit from "../useSubmit";

const WALLET: WalletState = {
  walletIcon: "",
  displayCoin: placeHolderDisplayToken["station"],
  coins: [placeHolderDisplayToken["station"]],
  address: "terra1w0fn5u7puxafp3g2mehe6xvt4w2x2eennm7tzf",
  chainId: chainIDs.terra_test,
  providerId: "station",
};

const mockShowModal = jest.fn();
jest.mock("contexts/ModalContext", () => ({
  __esModule: true,
  useModalContext: () => ({ showModal: mockShowModal }),
}));

jest.mock("helpers/processEstimateError", () => ({
  __esModule: true,
  default: (_: any) => {},
}));

const mockUseGetWallet = jest.fn();
jest.mock("contexts/WalletContext/WalletContext", () => ({
  __esModule: true,
  useGetWallet: () => mockUseGetWallet(),
}));

const mockSendTerraTx = jest.fn();

jest.mock("slices/transaction/transactors/sendTerraTx", () => ({
  __esModule: true,
  sendTerraTx: (..._: any[]) => mockSendTerraTx,
}));

const mockDispatch = jest.fn();
const mockUseGetter = jest.fn();

jest.mock("store/accessors", () => ({
  __esModule: true,
  useGetter: (..._: any[]) => mockUseGetter(),
  useSetter: () => mockDispatch,
}));

jest.mock("../useTransactionResultHandler", () => ({
  __esModule: true,
  default: () => jest.fn(),
}));

describe("useSubmit tests", () => {
  it("initializes correctly", () => {
    mockUseGetter.mockReturnValue({ form_loading: false });
    mockUseGetWallet.mockReturnValue({ wallet: WALLET });

    const { result } = renderHook(() => useSubmit());

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submit).toBeDefined();
  });

  it("assigns 'isSubmitting' value correctly", () => {
    mockUseGetter.mockReturnValue({ form_loading: true });
    mockUseGetWallet.mockReturnValue({ wallet: WALLET });

    const { result } = renderHook(() => useSubmit());
    expect(result.current.isSubmitting).toBe(true);
  });

  it("sets the Stage to 'error' Step when wallet not connected", async () => {
    mockUseGetter.mockReturnValue({ form_loading: false });
    mockUseGetWallet.mockReturnValue({ wallet: undefined });

    const { result } = renderHook(() => useSubmit());

    await act(() => result.current.submit(CHARITY));

    expect(mockShowModal).toBeCalled();
    expect(mockDispatch).toBeCalledWith({
      type: "transaction/setStage",
      payload: {
        step: "error",
        message: "Wallet is not connected",
      },
    });
  });

  it("handles thrown errors", async () => {
    mockUseGetter.mockReturnValue({ form_loading: false });
    mockUseGetWallet.mockReturnValue({ wallet: WALLET });
    jest
      .spyOn(Registrar.prototype, "createEndowmentCreationMsg")
      .mockImplementation((..._: any[]) => {
        throw new Error();
      });

    const { result } = renderHook(() => useSubmit());

    await act(() => result.current.submit(CHARITY));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "transaction/setFormLoading",
      payload: true,
    });
    expect(mockDispatch).toBeCalledWith({
      type: "transaction/setStage",
      payload: {
        step: "error",
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

  it("dispatches action sending a Terra Tx", async () => {
    mockUseGetter.mockReturnValue({ form_loading: false });
    mockUseGetWallet.mockReturnValue({ wallet: WALLET });
    jest
      .spyOn(Registrar.prototype, "createEndowmentCreationMsg")
      .mockReturnValue(MSG_EXECUTE_CONTRACT);

    const { result } = renderHook(() => useSubmit());

    await act(() => result.current.submit(CHARITY));

    expect(mockDispatch).toBeCalledWith({
      type: "transaction/setFormLoading",
      payload: true,
    });
    expect(mockDispatch).toBeCalledWith(mockSendTerraTx);
    expect(mockShowModal).toBeCalled();
  });
});

const CHARITY: Charity = {
  ContactPerson: {
    Email: "test@test.com",
    EmailVerified: true,
    FirstName: "first",
    LastName: "last",
    PhoneNumber: "+114323888",
    Role: "ceo",
    PK: "7fe792be-5132-4f2b-b37c-4bcd9445b773",
    SK: "ContactPerson",
    Goals: "i have some goals",
    ReferralMethod: "angel-alliance",
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
    SK: "Registration",
  },
  Metadata: {
    Banner: { name: "banner", publicUrl: "https://www.storage.path/banner" },
    CharityLogo: { name: "logo", publicUrl: "https://www.storage.path/logo" },
    CharityOverview: "some overview",
    EndowmentContract: "",
    SK: "Metadata",
    JunoWallet: "terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
    KycDonorsOnly: false,
  },
};

const MSG_EXECUTE_CONTRACT = {
  execute_msg: {
    create_endowment: {
      beneficiary: "terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
      cw4_members: [],
      guardians_multisig_addr: undefined,
      maturity_height: undefined,
      maturity_time: undefined,
      owner: "terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
      profile: {
        annual_revenue: undefined,
        average_annual_budget: undefined,
        charity_navigator_rating: undefined,
        contact_email: "test@test.com",
        country_of_origin: undefined,
        endow_type: "Charity",
        image: "https://www.storage.path/banner",
        logo: "https://www.storage.path/logo",
        name: "charity",
        number_of_employees: undefined,
        overview: "some overview",
        registration_number: undefined,
        social_media_urls: {
          facebook: undefined,
          linkedin: undefined,
          twitter: undefined,
        },
        street_address: undefined,
        tier: 1,
        un_sdg: 0,
        url: "www.test.com",
      },
      withdraw_before_maturity: false,
    },
  },
} as MsgExecuteContract;
