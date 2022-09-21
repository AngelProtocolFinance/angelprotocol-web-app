import { Charity, RegistrationStatus } from "types/aws";
import { placeholderCharity } from "services/aws/registration";
import { getRegistrationState } from "../getRegistrationState";

describe("getRegistrationState tests", () => {
  it.each([true, false])(
    "sets 'contact details' step to complete with EmailVerified === %j",
    (emailVerified) => {
      const charity: Charity = {
        ...placeholderCharity,
        ContactPerson: {
          Email: "test@test.com",
          EmailVerified: emailVerified,
          EmailVerificationLastSentDate: "2022-05-04T10:01:10Z",
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
          ...placeholderCharity.Registration,
          CharityName: "charity",
          CharityName_ContactEmail: "CHARITY_test@test.com",
          RegistrationDate: "2022-05-04T10:10:10Z",
          RegistrationStatus: "Inactive",
        },
      };

      const state = getRegistrationState(charity);

      expect(state.contactDetails.isComplete).toBe(true);
      expect(state.documentation.isComplete).toBe(false);
      expect(state.additionalInformation.isComplete).toBe(false);
      expect(state.walletRegistration.isComplete).toBe(false);
      expect(state.getIsReadyForSubmit()).toBe(false);
    }
  );

  it("sets 'documentation' step to incomplete when previous steps are incomplete", () => {
    const charity: Charity = {
      ...placeholderCharity,
      Registration: {
        CharityName: "charity",
        CharityName_ContactEmail: "CHARITY_test@test.com",
        RegistrationDate: "2022-05-04T10:10:10Z",
        RegistrationStatus: "Inactive",
        Website: "www.test.com",
        UN_SDG: 1,
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
    };

    const state = getRegistrationState(charity);

    expect(state.contactDetails.isComplete).toBe(false);
    expect(state.documentation.isComplete).toBe(false);
    expect(state.additionalInformation.isComplete).toBe(false);
    expect(state.walletRegistration.isComplete).toBe(false);
    expect(state.getIsReadyForSubmit()).toBe(false);
  });

  it("sets 'additional information' step to incomplete when previous steps are incomplete", () => {
    const charity: Charity = {
      ...placeholderCharity,
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

    expect(state.contactDetails.isComplete).toBe(false);
    expect(state.documentation.isComplete).toBe(false);
    expect(state.additionalInformation.isComplete).toBe(false);
    expect(state.walletRegistration.isComplete).toBe(false);
    expect(state.getIsReadyForSubmit()).toBe(false);
  });

  it("sets 'wallet registration' step to incomplete when previous steps are incomplete", () => {
    const charity: Charity = {
      ...placeholderCharity,
      Metadata: {
        Banner: { name: "", publicUrl: "" },
        CharityLogo: { name: "", publicUrl: "" },
        CharityOverview: "",
        EndowmentContract: "",
        SK: "Metadata",
        JunoWallet: "juno1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
        KycDonorsOnly: false,
      },
    };

    const state = getRegistrationState(charity);

    expect(state.contactDetails.isComplete).toBe(false);
    expect(state.documentation.isComplete).toBe(false);
    expect(state.additionalInformation.isComplete).toBe(false);
    expect(state.walletRegistration.isComplete).toBe(false);
    expect(state.getIsReadyForSubmit()).toBe(false);
  });

  const statuses: RegistrationStatus[] = [
    "Inactive",
    "Under Review",
    "Rejected",
    "Active",
  ];
  test.each(statuses)(
    "sets all steps to complete even when registration status is %j",
    (status) => {
      const charity: Charity = {
        ContactPerson: {
          Email: "test@test.com",
          EmailVerified: true,
          EmailVerificationLastSentDate: "2022-05-04T10:01:10Z",
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
          UN_SDG: 1,
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

      expect(state.contactDetails.isComplete).toBe(true);
      expect(state.documentation.isComplete).toBe(true);
      expect(state.additionalInformation.isComplete).toBe(true);
      expect(state.walletRegistration.isComplete).toBe(true);
      expect(state.getIsReadyForSubmit()).toBe(true);
    }
  );
});
