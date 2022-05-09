/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import Applications from "../Applications";
import { CharityApplication } from "../types";

const mockUseGetCharityApplicationsQuery = jest.fn();
jest.mock("services/aws/registration", () => ({
  __esModule: true,
  useGetCharityApplicationsQuery: () => mockUseGetCharityApplicationsQuery(),
}));

describe("Charity applications review", () => {
  afterAll(() => {
    jest.unmock("services/aws/registration");
  });

  test("Renders Initial state", async () => {
    mockUseGetCharityApplicationsQuery.mockReturnValue(initialState);
    render(<Applications />);

    expect(mockUseGetCharityApplicationsQuery).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/No applications found/i)).toBeInTheDocument();
  });

  test("Renders loading state", async () => {
    mockUseGetCharityApplicationsQuery.mockReturnValue(loadingState);
    render(<Applications />);

    expect(mockUseGetCharityApplicationsQuery).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Loading Applications/i)).toBeInTheDocument();
  });

  test("Application reviews rendered", async () => {
    mockUseGetCharityApplicationsQuery.mockReturnValue(loadedState);
    render(<Applications />);

    expect(mockUseGetCharityApplicationsQuery).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole("heading", { name: /Charity applications/i })
    ).toBeInTheDocument();

    // assert that both application names are rendered in table cells
    expect(
      screen.getByRole("cell", {
        name: /123_company_chinadev20@outlook\.com/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", {
        name: /all4good_ms@mail\.com/i,
      })
    ).toBeInTheDocument();

    // assert table has only 3 rows (heading + 2 charity applications)
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(3);
  });
});

const initialState = {
  data: [],
  isLoading: false,
  isError: true,
};

const loadingState = {
  data: [],
  isLoading: true,
  isError: false,
};

const mockReviewsData: CharityApplication[] = [
  {
    ProofOfEmploymentVerified: false,
    ProofOfIdentityVerified: false,
    RegistrationDate: "2021-10-19T06:45:46.313Z",
    CharityName: "123_Company",
    EndowmentAgreementVerified: false,
    ProofOfEmployment:
      "https://charity-registration-documents.s3.amazonaws.com/proof-of-employment/eafe2aa3-6882-49f9-8f32-bc7f721fb3ab.png",
    CharityName_ContactEmail: "123_COMPANY_chinadev20@outlook.com",
    ProofOfIdentity:
      "https://charity-registration-documents.s3.amazonaws.com/proof-of-identity/eafe2aa3-6882-49f9-8f32-bc7f721fb3ab.png",
    TerraWallet: "terra11",
    SK: "Registration",
    RegistrationStatus: "Under Review",
    PK: "eafe2aa3-6882-49f9-8f32-bc7f721fb3ab",
    EndowmentAgreement:
      "https://charity-registration-documents.s3.amazonaws.com/endowment-agreement/eafe2aa3-6882-49f9-8f32-bc7f721fb3ab.png",
  },
  {
    ProofOfEmploymentVerified: false,
    ProofOfIdentityVerified: false,
    RegistrationDate: "2021-10-19T06:49:46.313Z",
    CharityName: "All4Good",
    EndowmentAgreementVerified: false,
    ProofOfEmployment:
      "https://charity-registration-documents.s3.amazonaws.com/proof-of-employment/06c08277-bc60-4df8-b0a3-3d00e7e2f1be.png",
    CharityName_ContactEmail: "ALL4GOOD_ms@mail.com",
    ProofOfIdentity:
      "https://charity-registration-documents.s3.amazonaws.com/proof-of-identity/06c08277-bc60-4df8-b0a3-3d00e7e2f1be.png",
    TerraWallet: "terra23",
    SK: "Registration",
    RegistrationStatus: "Under Review",
    PK: "06c08277-bc60-4df8-b0a3-3d00e7e2f1be",
    EndowmentAgreement:
      "https://charity-registration-documents.s3.amazonaws.com/endowment-agreement/06c08277-bc60-4df8-b0a3-3d00e7e2f1be.png",
  },
];

const loadedState = {
  data: mockReviewsData,
  isLoading: false,
  isError: false,
};
