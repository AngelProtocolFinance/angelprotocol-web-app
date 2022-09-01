import { Charity } from "types/aws";
import routes from "pages/Registration/routes";
import { placeholderCharity } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import {
  getContactDetailsStepData,
  getDocumentationStepData,
} from "../stepChecks";

describe("stepChecks tests", () => {
  describe("getContactDetailsStepData tests", () => {
    it.each([true, false])(
      "returns 'completed' result when Contact Details data is validly set even when EmailVerified === %j",
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

  describe("getDocumentationStepData tests", () => {
    test("returns 'completed' result when Documentation and previous steps' data are validly set", () => {
      const charity: Charity = {
        ...placeholderCharity,
        ContactPerson: { ...VALIDLY_FILLED_CHARITY.ContactPerson },
        Registration: { ...VALIDLY_FILLED_CHARITY.Registration },
      };

      const stepData = getDocumentationStepData(charity);

      expect(stepData.isComplete).toBeTruthy();
      expect(stepData.urlToPreviousStep).toBeUndefined();
    });

    test("returns 'incomplete' result when previous step is incomplete with the previous step's URL to previous step", () => {
      const charity: Charity = {
        ...placeholderCharity,
        Registration: { ...VALIDLY_FILLED_CHARITY.Registration },
      };

      const stepData = getDocumentationStepData(charity);

      expect(stepData.isComplete).toBeFalsy();
      expect(stepData.urlToPreviousStep).toBe(appRoutes.register);
    });

    test("returns 'incomplete' result when Documentation data is incomplete", () => {
      const charity: Charity = {
        ...placeholderCharity,
        ContactPerson: { ...VALIDLY_FILLED_CHARITY.ContactPerson },
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

      const stepData = getDocumentationStepData(charity);

      expect(stepData.isComplete).toBeFalsy();
      expect(stepData.urlToPreviousStep).toBe(
        `${appRoutes.register}/${routes.documentation}`
      );
    });
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
