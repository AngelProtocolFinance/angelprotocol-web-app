import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { EndowmentProposal } from "types/aws";
import AppWrapper from "test/AppWrapper";
import Applications from "../index";

const mockEndowmentApplicationsQuery = vi.fn();
const mockAdminContext = vi.fn();

beforeEach(() => {
  vi.mock("services/aws/registration", () => ({
    useEndowmentApplicationsQuery: () => mockEndowmentApplicationsQuery(),
  }));
  vi.mock("../../../Context", () => ({
    useAdminResources: () => mockAdminContext(),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("Applications", () => {
  test("Loading applications", () => {
    mockEndowmentApplicationsQuery.mockReturnValue({
      isLoading: true,
    });
    render(
      <AppWrapper>
        <Applications />
      </AppWrapper>
    );
    expect(mockEndowmentApplicationsQuery).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/loading applications/i)).toBeInTheDocument();
  });
  test("Error getting applications", () => {
    mockEndowmentApplicationsQuery.mockReturnValue({
      isError: true,
    });
    render(
      <AppWrapper>
        <Applications />
      </AppWrapper>
    );
    expect(mockEndowmentApplicationsQuery).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/failed to get applications/i)).toBeInTheDocument();
  });
  test("No applications found", () => {
    mockEndowmentApplicationsQuery.mockReturnValue({
      data: [],
    });
    render(
      <AppWrapper>
        <Applications />
      </AppWrapper>
    );
    expect(mockEndowmentApplicationsQuery).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/no applications found/i)).toBeInTheDocument();
  });
  test("AppRows with poll id shows link to proposal page", () => {
    mockEndowmentApplicationsQuery.mockReturnValue({
      data: mockApplications,
    });
    render(
      <AppWrapper>
        <Applications />
      </AppWrapper>
    );
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(4); //header row, +3 app rows
    expect(
      screen.getAllByRole("link", {
        name: /review/i,
      })
    ).toHaveLength(3); //3 rows rendered with review button
  });
});

const mockApplications: EndowmentProposal[] = [
  {
    RegistrationDate: "2022-06-30T10:05:45.350Z",
    OrganizationName: "testCharity1",
    Website: "http://google.com",
    EIN: "123456789",
    ProofOfRegistration: {
      name: "proofReg",
      publicUrl: "proofRegUrl",
    },
    Email: "testCharity1@mail.com",
    ProofOfIdentity: {
      name: "proofIdentity",
      publicUrl: "proofIdentityUrl",
    },
    Tier: 3,
    RegistrationStatus: "Under Review",
    PK: "32e8ed16-ea13-448a-b31c-a0cec547aa7c",
    KycDonorsOnly: true,
    application_id: 1,
    ActiveInCountries: [],
    EndowDesignation: "Charity",
    HqCountry: "",
    CashEligible: true,
    AuthorizedToReceiveTaxDeductibleDonations: false,
    LegalEntityType: "Corporation",
    ProjectDescription: "",
  },
  {
    RegistrationDate: "2022-06-30T10:05:45.350Z",
    OrganizationName: "testCharity2",
    Website: "http://google.com",
    EIN: "123456789",
    ProofOfRegistration: {
      name: "proofReg",
      publicUrl: "proofRegUrl",
    },
    Email: "testCharity2@mail.com",
    ProofOfIdentity: {
      name: "proofIdentity",
      publicUrl: "proofIdentityUrl",
    },
    Tier: 3,
    RegistrationStatus: "Under Review",
    PK: "72e8ed16-ea13-458a-b31c-a0cec547aa7c",
    KycDonorsOnly: false,
    application_id: 2,
    ActiveInCountries: [],
    EndowDesignation: "Charity",
    HqCountry: "",
    CashEligible: true,
    AuthorizedToReceiveTaxDeductibleDonations: false,
    LegalEntityType: "Corporation",
    ProjectDescription: "",
  },
  {
    RegistrationDate: "2022-06-30T10:05:45.350Z",
    OrganizationName: "testCharity3",
    EIN: "123456789",
    Website: "http://google.com",
    ProofOfRegistration: {
      name: "proofReg",
      publicUrl: "proofRegUrl",
    },
    Email: "testCharity3@mail.com",
    ProofOfIdentity: {
      name: "proofIdentity",
      publicUrl: "proofIdentityUrl",
    },
    Tier: 3,
    RegistrationStatus: "Under Review",
    PK: "72e8ed16-ea13-448a-b31c-a0cec547aa9c",
    KycDonorsOnly: false,
    application_id: 3,
    ActiveInCountries: [],
    EndowDesignation: "Charity",
    HqCountry: "",
    CashEligible: true,
    AuthorizedToReceiveTaxDeductibleDonations: false,
    LegalEntityType: "Corporation",
    ProjectDescription: "",
  },
];
