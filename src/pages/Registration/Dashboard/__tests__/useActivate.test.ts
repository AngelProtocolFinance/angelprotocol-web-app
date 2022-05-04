import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { Charity } from "services/aws/types";
import useActivate from "../useActivate";

const PK = "7fe792be-5132-4f2b-b37c-4bcd9445b773";

const mockUseActivateMutation = jest.fn();

jest.mock("services/aws/registration", () => {
  const originalModule = jest.requireActual("services/aws/registration");

  return {
    __esModule: true,
    ...originalModule,
    useActivateMutation: () => mockUseActivateMutation(),
  };
});

jest.mock("components/ModalContext/ModalContext", () => {
  const originalModule = jest.requireActual(
    "components/ModalContext/ModalContext"
  );

  return {
    __esModule: true,
    ...originalModule,
    showModal: (...args: any[]) => {},
  };
});

const mockUseGetter = jest.fn();
const mockUseSetter = jest.fn();

jest.mock("store/accessors", () => {
  const originalModule = jest.requireActual("store/accessors");

  return {
    __esModule: true,
    ...originalModule,
    useGetter: (..._: any[]) => mockUseGetter(),
    useSetter: () => mockUseSetter(),
  };
});

describe("useActivate initializes correctly", () => {
  it("should return default values on initialization", () => {
    mockUseActivateMutation.mockReturnValue([
      (_: string) => ({}),
      { isLoading: false },
    ]);
    const { result } = renderHook(() => useActivate());

    expect(result.current.isSubmitting).toBeFalsy();
  });

  it("should return isSubmitting that is equal to useActivateMutation.isLoading", () => {
    mockUseActivateMutation.mockReturnValue([
      (_: string) => {},
      { isLoading: true },
    ]);
    const { result } = renderHook(() => useActivate());

    expect(result.current.isSubmitting).toBe(true);
  });

  test("activate handles happy flow correctly", async () => {
    const charity = getCharity();
    const mockActivate = jest.fn(() => ({}));
    const mockDispatch = jest.fn();
    mockUseGetter.mockReturnValue(charity);
    mockUseSetter.mockReturnValue(mockDispatch);
    mockUseActivateMutation.mockReturnValue([
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
        ...charity,
        Registration: {
          ...charity.Registration,
          RegistrationStatus: "Active",
        },
      },
    });
  });
});

const getCharity = (): Charity => ({
  ContactPerson: {
    Email: "test@test.com",
    EmailVerified: true,
    FirstName: "first",
    LastName: "last",
    PhoneNumber: "+114323888",
    Role: "ceo",
    PK,
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
    FinancialStatements: [],
    AuditedFinancialReports: [],
    ProofOfIdentityVerified: true,
    ProofOfRegistrationVerified: true,
    FinancialStatementsVerified: false,
    AuditedFinancialReportsVerified: false,
  },
  Metadata: {
    Banner: { name: "banner", publicUrl: "https://www.storage.path/banner" },
    CharityLogo: { name: "logo", publicUrl: "https://www.storage.path/logo" },
    CharityOverview: "some overview",
    EndowmentContract: "terra1ke4aktw6zvz2jxsyqx55ejsj7rmxdl9p5xywus",
    TerraWallet: "terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
  },
});
