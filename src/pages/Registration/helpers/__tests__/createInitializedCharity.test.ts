import { Charity } from "services/aws/types";
import createInitializedCharity from "../createInitializedCharity";

describe("createInitializedCharity tests", () => {
  it("creates a correctly initialized charity", () => {
    const uninitializedCharity = {
      ContactPerson: {
        Email: "test@test.com",
        EmailVerified: true,
        FirstName: "first",
        LastName: "last",
        PhoneNumber: "+114323888",
        PK: "7fe792be-5132-4f2b-b37c-4bcd9445b773",
        Role: "ceo",
        SK: "ContactPerson",
      },
      Registration: {
        CharityName: "charity",
        CharityName_ContactEmail: "CHARITY_test@test.com",
        RegistrationDate: "2022-05-04T10:10:10Z",
        RegistrationStatus: "Inactive",
        SK: "Registration",
        UN_SDG: 0,
      },
    };
    const expectedCharity: Charity = {
      ContactPerson: {
        Email: "test@test.com",
        EmailVerified: true,
        FirstName: "first",
        LastName: "last",
        PhoneNumber: "+114323888",
        PK: "7fe792be-5132-4f2b-b37c-4bcd9445b773",
        Role: "ceo",
        SK: "ContactPerson",
      },
      Registration: {
        AuditedFinancialReports: [],
        AuditedFinancialReportsVerified: false,
        CharityName: "charity",
        CharityName_ContactEmail: "CHARITY_test@test.com",
        FinancialStatements: [],
        FinancialStatementsVerified: false,
        ProofOfIdentity: { name: "" },
        ProofOfIdentityVerified: false,
        ProofOfRegistration: { name: "" },
        ProofOfRegistrationVerified: false,
        RegistrationDate: "2022-05-04T10:10:10Z",
        RegistrationStatus: "Inactive",
        SK: "Registration",
        Tier: undefined,
        UN_SDG: 0,
        Website: "",
      },
      Metadata: {
        Banner: { name: "" },
        CharityLogo: { name: "" },
        CharityOverview: "",
        EndowmentContract: "",
        SK: "Metadata",
        TerraWallet: "",
      },
    };

    const actualCharity = createInitializedCharity(
      uninitializedCharity as Charity
    );

    expect(actualCharity).toStrictEqual(expectedCharity);
  });
});
