import { Charity } from "services/aws/types";
import createCharityWithStepOneData from "../createCharityWithStepOneData";

describe("createCharityWithStepOneData tests", () => {
  it("creates a correctly initialized charity with just step 1 data", () => {
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
        KycDonorsOnly: false,
        SK: "Metadata",
        TerraWallet: "",
      },
    };

    const actualCharity = createCharityWithStepOneData(
      uninitializedCharity as Charity
    );

    expect(actualCharity).toStrictEqual(expectedCharity);
  });

  it("creates charity ignoring all steps 2, 3 and 4 data", () => {
    const charity: Charity = {
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
        ProofOfIdentity: {
          name: "poi",
          publicUrl: "https://www.storage.path/poi",
        },
        ProofOfIdentityVerified: true,
        ProofOfRegistration: {
          name: "por",
          publicUrl: "https://www.storage.path/por",
        },
        ProofOfRegistrationVerified: true,
        RegistrationDate: "2022-05-04T10:10:10Z",
        RegistrationStatus: "Inactive",
        SK: "Registration",
        Tier: 1,
        Website: "www.test.com",
        UN_SDG: 0,
      },
      Metadata: {
        Banner: {
          name: "banner",
          publicUrl: "https://www.storage.path/banner",
        },
        CharityLogo: {
          name: "logo",
          publicUrl: "https://www.storage.path/logo",
        },
        CharityOverview: "some overview",
        EndowmentContract: "terra1ke4aktw6zvz2jxsyqx55ejsj7rmxdl9p5xywus",
        KycDonorsOnly: false,
        SK: "Metadata",
        TerraWallet: "terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
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
        KycDonorsOnly: false,
        SK: "Metadata",
        TerraWallet: "",
      },
    };

    const actualCharity = createCharityWithStepOneData(charity);

    expect(actualCharity).toStrictEqual(expectedCharity);
  });
});
