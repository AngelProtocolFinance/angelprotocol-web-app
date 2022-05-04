import { renderHook } from "@testing-library/react-hooks";
import { useActivateMutation } from "services/aws/registration";
import { Charity } from "services/aws/types";
import useActivate from "../useActivate";

jest.mock("services/aws/registration", () => {
  const originalModule = jest.requireActual("services/aws/registration");

  return {
    __esModule: true,
    ...originalModule,
    useActivateMutation: () => [(_: string) => {}, { isLoading: false }],
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

jest.mock("store/accessors", () => {
  const originalModule = jest.requireActual("store/accessors");

  return {
    __esModule: true,
    ...originalModule,
    useGetter: (...args: any[]): Charity => getCharity(),
    useSetter:
      () =>
      (...args: any[]) => {},
  };
});

describe("useActivate initializes correctly", () => {
  it("should return default values on initialization", () => {
    const { result } = renderHook(() => useActivate());

    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.activate).toBeDefined();
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
    PK: "7fe792be-5132-4f2b-b37c-4bcd9445b773",
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
