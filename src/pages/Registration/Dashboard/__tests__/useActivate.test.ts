import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { Charity } from "types/server/aws";
import useActivate from "../useActivate";

const PK = "7fe792be-5132-4f2b-b37c-4bcd9445b773";

const mockUseActivateCharityMutation = jest.fn();
jest.mock("services/aws/registration", () => ({
  __esModule: true,
  useActivateCharityMutation: () => mockUseActivateCharityMutation(),
}));

const mockShowModal = jest.fn();
jest.mock("contexts/ModalContext", () => ({
  __esModule: true,
  useModalContext: () => ({ showModal: mockShowModal }),
}));

const mockDispatch = jest.fn();
const mockUseGetter = jest.fn();
jest.mock("store/accessors", () => ({
  __esModule: true,
  useGetter: (..._: any[]) => mockUseGetter(),
  useSetter: () => mockDispatch,
}));

describe("useActivate tests", () => {
  it("should return default values on initialization", () => {
    mockUseActivateCharityMutation.mockReturnValue([
      (_: string) => ({}),
      { isLoading: false },
    ]);
    const { result } = renderHook(() => useActivate());

    expect(result.current.isSubmitting).toBeFalsy();
  });

  it("should return isSubmitting that is equal to useActivateMutation.isLoading", () => {
    mockUseActivateCharityMutation.mockReturnValue([
      (_: string) => {},
      { isLoading: true },
    ]);
    const { result } = renderHook(() => useActivate());

    expect(result.current.isSubmitting).toBe(true);
  });

  it("handles happy flow correctly", async () => {
    const mockActivate = jest.fn(() => ({}));
    mockUseGetter.mockReturnValue(CHARITY);
    mockUseActivateCharityMutation.mockReturnValue([
      mockActivate,
      { isLoading: false },
    ]);

    const { result } = renderHook(() => useActivate());

    await act(() => result.current.activate(PK));

    expect(mockActivate).toHaveBeenCalledWith(PK);
    expect(mockActivate).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "charity/updateCharity",
      payload: {
        ...CHARITY,
        Registration: {
          ...CHARITY.Registration,
          RegistrationStatus: "Active",
        },
      },
    });
  });

  it("handles error flow correctly", async () => {
    const error = {
      error: { status: "FETCH_ERROR", error: "some error" },
    };
    const mockActivate = jest.fn(() => error);
    mockUseGetter.mockReturnValue(CHARITY);
    mockUseActivateCharityMutation.mockReturnValue([
      mockActivate,
      { isLoading: false },
    ]);

    const { result } = renderHook(() => useActivate());

    await act(() => result.current.activate(PK));

    expect(mockActivate).toHaveBeenCalledWith(PK);
    expect(mockActivate).toHaveBeenCalled();
    expect(mockShowModal).toHaveBeenCalled();
    expect(mockDispatch).not.toBeCalled();
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
  },
  Registration: {
    CharityName: "charity",
    CharityName_ContactEmail: "CHARITY_test@test.com",
    RegistrationDate: "2022-05-04T10:10:10Z",
    RegistrationStatus: "Approved",
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
    ProofOfIdentityVerified: true,
    ProofOfRegistrationVerified: true,
    FinancialStatementsVerified: false,
    AuditedFinancialReportsVerified: false,
    SK: "Registration",
  },
  Metadata: {
    Banner: { name: "banner", publicUrl: "https://www.storage.path/banner" },
    CharityLogo: { name: "logo", publicUrl: "https://www.storage.path/logo" },
    CharityOverview: "some overview",
    EndowmentContract: "terra1ke4aktw6zvz2jxsyqx55ejsj7rmxdl9p5xywus",
    SK: "Metadata",
    TerraWallet: "terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
  },
};
