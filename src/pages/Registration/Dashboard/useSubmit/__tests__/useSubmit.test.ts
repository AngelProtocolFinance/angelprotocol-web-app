import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { act, renderHook } from "@testing-library/react";
import { Charity } from "types/aws";
import { GENERIC_ERROR_MESSAGE } from "pages/Registration/constants";
import { PLACEHOLDER_WALLET } from "test/constants";
import Account from "contracts/Account";
import useSubmit from "../useSubmit";

const mockShowModal = jest.fn();
jest.mock("contexts/ModalContext", () => ({
  __esModule: true,
  useModalContext: () => ({ showModal: mockShowModal }),
}));

jest.mock("helpers/processEstimateError", () => ({
  __esModule: true,
  processEstimateError: (_: any) => {},
}));

const mockUseGetWallet = jest.fn();
jest.mock("contexts/WalletContext/WalletContext", () => ({
  __esModule: true,
  useGetWallet: () => mockUseGetWallet(),
}));

const mockSendCosmosTx = jest.fn();
jest.mock("slices/transaction/transactors/sendCosmosTx", () => ({
  __esModule: true,
  sendCosmosTx: (..._: any[]) => mockSendCosmosTx,
}));

const mockDispatch = jest.fn();
const mockUseGetter = jest.fn();

jest.mock("store/accessors", () => ({
  __esModule: true,
  useGetter: (..._: any[]) => mockUseGetter(),
  useSetter: () => mockDispatch,
}));

describe("useSubmit tests", () => {
  it("initializes correctly", () => {
    mockUseGetter.mockReturnValue({ form_loading: false });
    mockUseGetWallet.mockReturnValue({ wallet: PLACEHOLDER_WALLET });
    const { result } = renderHook(() => useSubmit());
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submit).toBeDefined();
  });

  it("assigns 'isSubmitting' value correctly", () => {
    mockUseGetter.mockReturnValue({ form_loading: true });
    mockUseGetWallet.mockReturnValue({ wallet: PLACEHOLDER_WALLET });
    const { result } = renderHook(() => useSubmit());
    expect(result.current.isSubmitting).toBe(true);
  });

  // wallet check now handled in `sendCosmosTx`
  it("handles thrown errors", async () => {
    mockUseGetter.mockReturnValue({ form_loading: false });
    mockUseGetWallet.mockReturnValue({ wallet: PLACEHOLDER_WALLET });
    jest
      .spyOn(Account.prototype, "createEndowmentCreationMsg")
      .mockImplementation((..._: any[]) => {
        throw new Error();
      });
    const { result } = renderHook(() => useSubmit());
    await act(() => result.current.submit(CHARITY));
    //sendCosmosTx sets loading state
    expect(mockDispatch).toBeCalledWith({
      type: "transaction/setStage",
      payload: {
        step: "error",
        message: GENERIC_ERROR_MESSAGE,
      },
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "transaction/setFormLoading",
      payload: false,
    });
    expect(mockShowModal).toBeCalled();
  });

  it("dispatches action sending a Juno Tx", async () => {
    mockUseGetter.mockReturnValue({ form_loading: false });
    mockUseGetWallet.mockReturnValue({ wallet: PLACEHOLDER_WALLET });
    jest
      .spyOn(Account.prototype, "createEndowmentCreationMsg")
      .mockReturnValue(MSG_EXECUTE_CONTRACT);
    const { result } = renderHook(() => useSubmit());
    await act(() => result.current.submit(CHARITY));
    //sendCosmosTx sets loading state
    expect(mockDispatch).toBeCalledWith(mockSendCosmosTx);
    expect(mockShowModal).toBeCalled();
  });
});

const CHARITY: Charity = {
  ContactPerson: {
    Email: "test@test.com",
    EmailVerified: true,
    EmailVerificationLastSentDate: "2022-05-04T10:01:10Z",
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
    JunoWallet:
      "juno1qsn67fzym4hak4aly07wvcjxyzcld0n4s726r2fs9km2tlahlc5qg2drvn",
    KycDonorsOnly: false,
  },
};

const MSG_EXECUTE_CONTRACT = {
  typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
  value: {
    create_endowment: {
      beneficiary:
        "juno1qsn67fzym4hak4aly07wvcjxyzcld0n4s726r2fs9km2tlahlc5qg2drvn",
      cw4_members: [],
      guardians_multisig_addr: undefined,
      maturity_height: undefined,
      maturity_time: undefined,
      owner: "juno1qsn67fzym4hak4aly07wvcjxyzcld0n4s726r2fs9km2tlahlc5qg2drvn",
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
} as MsgExecuteContractEncodeObject;
