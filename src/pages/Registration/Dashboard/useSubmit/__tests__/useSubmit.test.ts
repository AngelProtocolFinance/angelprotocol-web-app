import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { act, renderHook } from "@testing-library/react";
import { Charity } from "types/aws";
import { ApplicationProposal, NewEndowment } from "types/contracts";
import { GENERIC_ERROR_MESSAGE } from "pages/Registration/constants";
import { PLACEHOLDER_WALLET } from "test/constants";
import CW3Review from "contracts/CW3/CW3Review";
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
      .spyOn(CW3Review.prototype, "createProposeApplicationMsg")
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
      .spyOn(CW3Review.prototype, "createProposeApplicationMsg")
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
    OrganizationName: "charity",
    OrganizationName_ContactEmail: "CHARITY_test@test.com",
    RegistrationDate: "2022-05-04T10:10:10Z",
    RegistrationStatus: "Inactive",
    Website: "www.test.com",
    UN_SDG: 1,
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
    EndowmentId: 0,
    Banner: { name: "banner", publicUrl: "https://www.storage.path/banner" },
    Logo: { name: "logo", publicUrl: "https://www.storage.path/logo" },
    Overview: "some overview",
    EndowmentContract: "",
    SK: "Metadata",
    JunoWallet:
      "juno1qsn67fzym4hak4aly07wvcjxyzcld0n4s726r2fs9km2tlahlc5qg2drvn",
    KycDonorsOnly: false,
  },
};

const createEndowmentMsg: NewEndowment = {
  owner: CHARITY.Metadata.JunoWallet,
  tier: 1,
  categories: { sdgs: [CHARITY.Registration.UN_SDG], general: [] },
  withdraw_before_maturity: false,
  maturity_height: undefined,
  maturity_time: undefined,
  endow_type: "Charity",
  image: CHARITY.Metadata.Banner!.publicUrl,
  logo: CHARITY.Metadata.Logo!.publicUrl,
  name: CHARITY.Registration.OrganizationName,

  profile: {
    annual_revenue: undefined,
    average_annual_budget: undefined,
    charity_navigator_rating: undefined,
    contact_email: CHARITY.ContactPerson.Email,
    country_of_origin: undefined,
    street_address: undefined,
    url: CHARITY.Registration.Website,
    number_of_employees: undefined,
    overview: CHARITY.Metadata.Overview,
    registration_number: undefined,
    social_media_urls: {
      facebook: undefined,
      linkedin: undefined,
      twitter: undefined,
    },
  },

  cw4_members: [{ addr: CHARITY.Metadata.JunoWallet, weight: 1 }],
  kyc_donors_only: CHARITY.Metadata.KycDonorsOnly,
  cw3_threshold: { absolute_percentage: { percentage: "0.5" } },
  cw3_max_voting_period: 86400, //seconds - 24H
};

const applicationProposal: ApplicationProposal = {
  ref_id: CHARITY.ContactPerson.PK!,
  msg: createEndowmentMsg,
};

const MSG_EXECUTE_CONTRACT = {
  typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
  value: {
    propose_application: applicationProposal,
  },
} as MsgExecuteContractEncodeObject;
