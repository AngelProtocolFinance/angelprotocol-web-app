import { Charity } from "types/aws";
import { placeholderCharity } from "services/aws/registration";
import { getContactDetailsStepData } from "../stepChecks";

describe("stepChecks tests", () => {
  describe("getContactDetailsStepData tests", () => {
    it.each([true, false])(
      "returns completed result when Contact Details data is validly set even when EmailVerified === %j",
      (emailVerified) => {
        const charity: Charity = {
          ...placeholderCharity,
          ContactPerson: {
            ...VALIDLY_FILLED_CHARITY.ContactPerson,
            EmailVerified: emailVerified,
          },
          Registration: {
            ...placeholderCharity.Registration,
            CharityName: VALIDLY_FILLED_CHARITY.Registration.CharityName,
            CharityName_ContactEmail:
              VALIDLY_FILLED_CHARITY.Registration.CharityName_ContactEmail,
            RegistrationDate:
              VALIDLY_FILLED_CHARITY.Registration.RegistrationDate,
            RegistrationStatus:
              VALIDLY_FILLED_CHARITY.Registration.RegistrationStatus,
          },
        };

        const stepData = getContactDetailsStepData(charity);

        expect(stepData.isComplete).toBeTruthy();
        expect(stepData.urlToPreviousStep).toBeUndefined();
      }
    );
  });
});

const VALIDLY_FILLED_CHARITY: Charity = {
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
    SK: "Registration",
    UN_SDG: 1,
    Tier: 1,
    Website: "https://www.example.com",
    ProofOfIdentity: { name: "poi.pdf", publicUrl: "https://path.to.poi" },
    ProofOfIdentityVerified: false,
    ProofOfRegistration: { name: "por.pdf", publicUrl: "https://path.to.por" },
    ProofOfRegistrationVerified: false,
    AuditedFinancialReports: [
      { name: "afr.pdf", publicUrl: "https://path.to.afr" },
    ],
    AuditedFinancialReportsVerified: false,
    FinancialStatements: [{ name: "fs.pdf", publicUrl: "https://path.to.fs" }],
    FinancialStatementsVerified: false,
  },
  Metadata: {
    SK: "Metadata",
    Banner: { name: "banner.png", publicUrl: "https://path.to.banner" },
    CharityLogo: { name: "logo.png", publicUrl: "https://path.to.logo" },
    CharityOverview: "text",
    EndowmentContract: "juno1ke4aktw6zvz2jxsyqx55ejsj7rmxdl9p5xywus",
    JunoWallet: "juno1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
    KycDonorsOnly: false,
  },
};
