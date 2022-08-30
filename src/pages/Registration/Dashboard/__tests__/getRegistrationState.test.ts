import { Charity, RegistrationStatus } from "types/aws";
import getRegistrationState from "../getRegistrationState";

describe("getRegistrationState tests", () => {
  it("sets only stepOne to complete", () => {
    const charity: Charity = {
      ContactPerson: {
        Email: "test@test.com",
        EmailVerified: true,
        Goals: "i have a goal",
        FirstName: "first",
        LastName: "last",
        PhoneNumber: "+114323888",
        PK: "7fe792be-5132-4f2b-b37c-4bcd9445b773",
        ReferralMethod: "angel-alliance",
        Role: "ceo",
        SK: "ContactPerson",
      },
      Registration: {
        CharityName: "charity",
        CharityName_ContactEmail: "CHARITY_test@test.com",
        RegistrationDate: "2022-05-04T10:10:10Z",
        RegistrationStatus: "Inactive",
        Website: "",
        UN_SDG: 0,
        ProofOfIdentity: { name: "" },
        ProofOfRegistration: { name: "" },
        Tier: undefined,
        FinancialStatements: [],
        AuditedFinancialReports: [],
        ProofOfIdentityVerified: false,
        ProofOfRegistrationVerified: false,
        FinancialStatementsVerified: false,
        AuditedFinancialReportsVerified: false,
        SK: "Registration",
      },
      Metadata: {
        Banner: { name: "" },
        CharityLogo: { name: "" },
        CharityOverview: "",
        EndowmentContract: "",
        SK: "Metadata",
        JunoWallet: "",
        KycDonorsOnly: false,
      },
    };

    const state = getRegistrationState(charity);

    expect(state.stepOne.completed).toBe(true);
    expect(state.stepTwo.completed).toBe(false);
    expect(state.stepThree.completed).toBe(false);
    expect(state.stepFour.completed).toBe(false);
    expect(state.getIsReadyForSubmit()).toBe(false);
  });

  it("sets only steps One and Two to complete", () => {
    const charity: Charity = {
      ContactPerson: {
        Email: "test@test.com",
        EmailVerified: true,
        Goals: "I have a goal",
        FirstName: "first",
        LastName: "last",
        PhoneNumber: "+114323888",
        Role: "ceo",
        ReferralMethod: "angel-alliance",
        PK: "7fe792be-5132-4f2b-b37c-4bcd9445b773",
        SK: "ContactPerson",
      },
      Registration: {
        CharityName: "charity",
        CharityName_ContactEmail: "CHARITY_test@test.com",
        RegistrationDate: "2022-05-04T10:10:10Z",
        RegistrationStatus: "Inactive",
        Website: "",
        UN_SDG: 0,
        ProofOfIdentity: { name: "" },
        ProofOfRegistration: { name: "" },
        Tier: undefined,
        FinancialStatements: [],
        AuditedFinancialReports: [],
        ProofOfIdentityVerified: false,
        ProofOfRegistrationVerified: false,
        FinancialStatementsVerified: false,
        AuditedFinancialReportsVerified: false,
        SK: "Registration",
      },
      Metadata: {
        Banner: { name: "" },
        CharityLogo: { name: "" },
        CharityOverview: "",
        EndowmentContract: "",
        SK: "Metadata",
        JunoWallet: "juno1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
        KycDonorsOnly: false,
      },
    };

    const state = getRegistrationState(charity);

    expect(state.stepOne.completed).toBe(true);
    expect(state.stepTwo.completed).toBe(true);
    expect(state.stepThree.completed).toBe(false);
    expect(state.stepFour.completed).toBe(false);
    expect(state.getIsReadyForSubmit()).toBe(false);
  });

  it("sets only steps One and Three to complete", () => {
    const charity: Charity = {
      ContactPerson: {
        Email: "test@test.com",
        EmailVerified: true,
        Goals: "this is my goal",
        FirstName: "first",
        LastName: "last",
        PhoneNumber: "+114323888",
        Role: "ceo",
        ReferralMethod: "angel-alliance",
        PK: "7fe792be-5132-4f2b-b37c-4bcd9445b773",
        SK: "ContactPerson",
      },
      Registration: {
        CharityName: "charity",
        CharityName_ContactEmail: "CHARITY_test@test.com",
        RegistrationDate: "2022-05-04T10:10:10Z",
        RegistrationStatus: "Inactive",
        Website: "www.test.com",
        UN_SDG: 0,
        ProofOfIdentity: {
          name: "poi",
          publicUrl: "https://www.storage.path/poi",
        },
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
        Banner: { name: "" },
        CharityLogo: { name: "" },
        CharityOverview: "",
        EndowmentContract: "",
        SK: "Metadata",
        JunoWallet: "",
        KycDonorsOnly: false,
      },
    };

    const state = getRegistrationState(charity);

    expect(state.stepOne.completed).toBe(true);
    expect(state.stepTwo.completed).toBe(false);
    expect(state.stepThree.completed).toBe(true);
    expect(state.stepFour.completed).toBe(false);
    expect(state.getIsReadyForSubmit()).toBe(false);
  });

  it("sets only steps One and Four to complete", () => {
    const charity: Charity = {
      ContactPerson: {
        Email: "test@test.com",
        EmailVerified: true,
        FirstName: "first",
        Goals: "i have a goal",
        LastName: "last",
        PhoneNumber: "+114323888",
        Role: "ceo",
        ReferralMethod: "angel-alliance",
        PK: "7fe792be-5132-4f2b-b37c-4bcd9445b773",
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
        Banner: {
          name: "banner",
          publicUrl: "https://www.storage.path/banner",
        },
        CharityLogo: {
          name: "logo",
          publicUrl: "https://www.storage.path/logo",
        },
        CharityOverview: "some overview",
        EndowmentContract: "",
        SK: "Metadata",
        JunoWallet: "",
        KycDonorsOnly: false,
      },
    };

    const state = getRegistrationState(charity);

    expect(state.stepOne.completed).toBe(true);
    expect(state.stepTwo.completed).toBe(false);
    expect(state.stepThree.completed).toBe(false);
    expect(state.stepFour.completed).toBe(true);
    expect(state.getIsReadyForSubmit()).toBe(false);
  });

  it("sets all steps to complete even when Inactive", () => {
    runSetsAllStepsToCompleteEvenWhen("Inactive");
  });

  it("sets all steps to complete even when Under Review", () => {
    runSetsAllStepsToCompleteEvenWhen("Under Review");
  });

  it("sets all steps to complete even when Approved", () => {
    runSetsAllStepsToCompleteEvenWhen("Approved");
  });

  it("sets all steps to complete even when Active", () => {
    runSetsAllStepsToCompleteEvenWhen("Active");
  });

  function runSetsAllStepsToCompleteEvenWhen(status: RegistrationStatus) {
    const charity: Charity = {
      ContactPerson: {
        Email: "test@test.com",
        EmailVerified: true,
        FirstName: "first",
        LastName: "last",
        Goals: "hello world",
        PhoneNumber: "+114323888",
        ReferralMethod: "angel-alliance",
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
        RegistrationStatus: status,
        SK: "Registration",
        Tier: 1,
        UN_SDG: 0,
        Website: "www.test.com",
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
        EndowmentContract: "juno1ke4aktw6zvz2jxsyqx55ejsj7rmxdl9p5xywus",
        SK: "Metadata",
        JunoWallet: "juno1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
        KycDonorsOnly: false,
      },
    };

    const state = getRegistrationState(charity);

    expect(state.stepOne.completed).toBe(true);
    expect(state.stepTwo.completed).toBe(true);
    expect(state.stepThree.completed).toBe(true);
    expect(state.stepFour.completed).toBe(true);
    expect(state.getIsReadyForSubmit()).toBe(true);
  }
});
