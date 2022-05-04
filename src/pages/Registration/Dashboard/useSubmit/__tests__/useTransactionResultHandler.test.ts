import { renderHook } from "@testing-library/react-hooks";
import { Charity } from "services/aws/types";
import useTransactionResultHandler from "../useTransactionResultHandler";

const PK = "7fe792be-5132-4f2b-b37c-4bcd9445b773";

const mockUseSubmitMutation = jest.fn();

jest.mock("services/aws/registration", () => {
  const originalModule = jest.requireActual("services/aws/registration");

  return {
    __esModule: true,
    ...originalModule,
    useSubmitMutation: () => mockUseSubmitMutation(),
  };
});

const mockShowModal = jest.fn();

jest.mock("components/ModalContext/ModalContext", () => {
  const originalModule = jest.requireActual(
    "components/ModalContext/ModalContext"
  );

  return {
    __esModule: true,
    ...originalModule,
    useModalContext: () => ({ showModal: mockShowModal }),
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

it("should return payload", () => {
  const { result } = renderHook(() => useTransactionResultHandler());
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
});
