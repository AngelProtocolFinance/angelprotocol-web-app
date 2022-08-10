import { renderHook } from "@testing-library/react-hooks";
import { Stage, Step } from "slices/transaction/types";
import { Charity } from "types/server/aws";
import useTransactionResultHandler from "../useTransactionResultHandler";

const PK = "7fe792be-5132-4f2b-b37c-4bcd9445b773";

const mockUseSubmitMutation = jest.fn();
const mockRegistrationQuery = jest.fn();
jest.mock("services/aws/registration", () => ({
  __esModule: true,
  useSubmitMutation: () => mockUseSubmitMutation(),
  useRegistrationQuery: (..._: any[]) => mockRegistrationQuery(_),
  useRegistrationState: (..._: any[]) => mockRegistrationQuery(_),
}));

const mockHandleError = jest.fn();
jest.mock("contexts/ErrorContext", () => ({
  __esModule: true,
  useErrorContext: () => ({ handleError: mockHandleError }),
}));

const mockDispatch = jest.fn();
const mockUseGetter = jest.fn();

jest.mock("store/accessors", () => ({
  __esModule: true,
  useGetter: (..._: any[]) => mockUseGetter(),
  useSetter: () => mockDispatch,
}));

describe("useTransactionResultHandler tests", () => {
  it("does nothing when not in success/error stage", () => {
    function runTest(step: Step) {
      mockRegistrationQuery.mockReturnValueOnce({ data: CHARITY });
      mockUseGetter.mockReturnValueOnce({
        form_loading: false,
        form_error: null,
        fee: 0,
        stage: { step },
      });
      const mockSubmit = jest.fn((..._: any[]) => ({}));
      mockUseSubmitMutation.mockReturnValue([mockSubmit]);
      renderHook(() => useTransactionResultHandler());
      expect(mockSubmit).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
      expect(mockHandleError).not.toHaveBeenCalled();
    }
    runTest("form");
    runTest("broadcast");
    runTest("submit");
    runTest("receipt");
  });
  it("handles error stage", () => {
    mockRegistrationQuery.mockReturnValueOnce({ data: CHARITY });
    mockUseGetter.mockReturnValueOnce({
      form_loading: false,
      form_error: null,
      fee: 0,
      stage: { step: "error", message: "error" },
    });
    const mockSubmit = jest.fn((..._: any[]) => ({}));
    mockUseSubmitMutation.mockReturnValue([mockSubmit]);
    renderHook(() => useTransactionResultHandler());
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(mockHandleError).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
  });
  it("handles success step with error", async () => {
    mockRegistrationQuery.mockReturnValueOnce({ data: CHARITY });
    mockUseGetter.mockReturnValueOnce({
      form_loading: false,
      form_error: null,
      fee: 0,
      stage: SUCCESS_STAGE,
    });
    const mockSubmit = jest.fn();
    mockSubmit.mockResolvedValue({
      error: { status: "FETCH_ERROR", error: "error" },
    });
    mockUseSubmitMutation.mockReturnValue([mockSubmit]);
    const { waitFor } = renderHook(() => useTransactionResultHandler());
    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
    // if 'showModal' call is not await like this, jest tries to somehow
    // assert this before 'mockSubmit' has been called
    await waitFor(() => expect(mockHandleError).toHaveBeenCalled());
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "transaction/setFormLoading",
      payload: false,
    });
  });
});

const CHARITY: Charity = {
  ContactPerson: {
    Email: "test@test.com",
    EmailVerified: true,
    FirstName: "first",
    LastName: "last",
    PhoneNumber: "+114323888",
    PK,
    Role: "ceo",
    SK: "ContactPerson",
    Goals: "hello world",
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

const SUCCESS_STAGE = {
  step: "success",
  rawLog: JSON.stringify([
    {
      events: [
        {
          type: "instantiate_contract",
          attributes: [
            {
              key: "contract_address",
              value:
                "juno1rahc28lsvetcra9fwueekm3u0l00jgdsnry8amcu8j9ah3c60ydqzrd70r",
            },
          ],
        },
      ],
    },
  ]),
} as Stage;
