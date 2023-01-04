import { render, screen } from "@testing-library/react";
import { EndowmentProposal } from "types/aws";
import AppWrapper from "test/AppWrapper";
import Applications from "..";

const mockEndowmentApplicationsQuery = jest.fn();
const mockAdminContext = jest.fn();

jest.mock("services/aws/registration", () => ({
  __esModule: true,
  useEndowmentApplicationsQuery: () => mockEndowmentApplicationsQuery(),
}));
jest.mock("pages/Admin/Guard", () => ({
  __esModule: true,
  useAdminResources: () => mockAdminContext(),
}));

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
    FinancialStatements: [
      {
        name: "fs1",
        publicUrl: "fs1Url",
      },
      {
        name: "fs2",
        publicUrl: "fs2Url",
      },
    ],
    ProofOfRegistration: {
      name: "proofReg",
      publicUrl: "proofRegUrl",
    },
    Email: "ttestCharity1@mail.com",
    ProofOfIdentity: {
      name: "proofIdentity",
      publicUrl: "proofIdentityUrl",
    },
    Tier: 3,
    RegistrationStatus: "Under Review",
    PK: "72e8ed16-ea13-448a-b31c-a0cec547aa7c",
    AuditedFinancialReports: [
      {
        name: "auditedFinReport1",
        publicUrl: "auditedFinReport1Url",
      },
      {
        name: "auditedFinReport2",
        publicUrl: "auditedFinReport2Url",
      },
      {
        name: "auditedFinReport3",
        publicUrl: "auditedFinReport3Url",
      },
    ],
    KycDonorsOnly: false,
    poll_id: 1,
  },
  {
    RegistrationDate: "2022-06-30T10:05:45.350Z",
    OrganizationName: "testCharity2",
    Website: "http://google.com",
    FinancialStatements: [
      {
        name: "fs1",
        publicUrl: "fs1Url",
      },
      {
        name: "fs2",
        publicUrl: "fs2Url",
      },
    ],
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
    AuditedFinancialReports: [
      {
        name: "auditedFinReport1",
        publicUrl: "auditedFinReport1Url",
      },
      {
        name: "auditedFinReport2",
        publicUrl: "auditedFinReport2Url",
      },
      {
        name: "auditedFinReport3",
        publicUrl: "auditedFinReport3Url",
      },
    ],
    KycDonorsOnly: true,
    poll_id: 2,
  },
  {
    RegistrationDate: "2022-06-30T10:05:45.350Z",
    OrganizationName: "testCharity3",
    Website: "http://google.com",
    FinancialStatements: [
      {
        name: "fs1",
        publicUrl: "fs1Url",
      },
      {
        name: "fs2",
        publicUrl: "fs2Url",
      },
    ],
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
    AuditedFinancialReports: [
      {
        name: "auditedFinReport1",
        publicUrl: "auditedFinReport1Url",
      },
      {
        name: "auditedFinReport2",
        publicUrl: "auditedFinReport2Url",
      },
      {
        name: "auditedFinReport3",
        publicUrl: "auditedFinReport3Url",
      },
    ],
    KycDonorsOnly: false,
    poll_id: 3,
  },
];
