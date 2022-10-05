import { Application } from "types/aws";
import routes from "pages/Registration/routes";
import { placeholderApplication } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import {
  getAdditionalInformationStepData,
  getContactDetailsStepData,
  getDocumentationStepData,
  getWalletRegistrationStepData,
} from "../stepChecks";

describe("stepChecks tests", () => {
  describe("getContactDetailsStepData tests", () => {
    it.each([true, false])(
      "returns 'completed' result when Contact Details data is validly set even when EmailVerified === %j",
      (emailVerified) => {
        const application: Application = {
          ...CONTACT_DETAILS_STEP_COMPLETE_APPLICATION,
        };
        application.ContactPerson.EmailVerified = emailVerified;

        const stepData = getContactDetailsStepData(application);

        expect(stepData.isComplete).toBeTruthy();
        expect(stepData.urlToPreviousStep).toBeUndefined();
      }
    );
  });

  describe("getDocumentationStepData tests", () => {
    test("returns 'completed' result when Documentation and previous steps' data are validly set", () => {
      const application: Application = {
        ...DOCUMENTATION_STEP_COMPLETE_APPLICATION,
      };

      const stepData = getDocumentationStepData(application);

      expect(stepData.isComplete).toBeTruthy();
      expect(stepData.urlToPreviousStep).toBeUndefined();
    });

    test("returns 'incomplete' result when all steps are incomplete with URL to Contact Details step", () => {
      const application: Application = { ...placeholderApplication };

      const stepData = getDocumentationStepData(application);

      expect(stepData.isComplete).toBeFalsy();
      expect(stepData.urlToPreviousStep).toBe(appRoutes.register);
    });

    test("returns 'incomplete' result when Documentation data is incomplete", () => {
      const application: Application = {
        ...CONTACT_DETAILS_STEP_COMPLETE_APPLICATION,
      };

      const stepData = getDocumentationStepData(application);

      expect(stepData.isComplete).toBeFalsy();
      expect(stepData.urlToPreviousStep).toBe(
        `${appRoutes.register}/${routes.documentation}`
      );
    });
  });

  describe("getAdditionalInformationStepData tests", () => {
    test("returns 'completed' result when Additional Information and previous steps' data are validly set", () => {
      const application: Application = {
        ...ADDITIONAL_INFO_STEP_COMPLETE_APPLICATION,
      };

      const stepData = getAdditionalInformationStepData(application);

      expect(stepData.isComplete).toBeTruthy();
      expect(stepData.urlToPreviousStep).toBeUndefined();
    });

    test("returns 'incomplete' result when all steps are incomplete with URL to Contact Details step", () => {
      const application: Application = { ...placeholderApplication };

      const stepData = getAdditionalInformationStepData(application);

      expect(stepData.isComplete).toBeFalsy();
      expect(stepData.urlToPreviousStep).toBe(appRoutes.register);
    });

    test("returns 'incomplete' result when previous steps are incomplete with the previous step's URL to Documentation step", () => {
      const application: Application = {
        ...CONTACT_DETAILS_STEP_COMPLETE_APPLICATION,
      };

      const stepData = getAdditionalInformationStepData(application);

      expect(stepData.isComplete).toBeFalsy();
      expect(stepData.urlToPreviousStep).toBe(
        `${appRoutes.register}/${routes.documentation}`
      );
    });

    test("returns 'incomplete' result when Additional Information data is incomplete", () => {
      const application: Application = {
        ...DOCUMENTATION_STEP_COMPLETE_APPLICATION,
      };

      const stepData = getAdditionalInformationStepData(application);

      expect(stepData.isComplete).toBeFalsy();
      expect(stepData.urlToPreviousStep).toBe(
        `${appRoutes.register}/${routes.additionalInformation}`
      );
    });
  });

  describe("getWalletRegistrationStepData tests", () => {
    test("returns 'completed' result when all steps' data is validly set", () => {
      const application: Application = { ...VALIDLY_FILLED_APPLICATION };

      const stepData = getWalletRegistrationStepData(application);

      expect(stepData.isComplete).toBeTruthy();
      expect(stepData.urlToPreviousStep).toBeUndefined();
    });

    test("returns 'incomplete' result when all steps are incomplete with URL to Contact Details step", () => {
      const application: Application = { ...placeholderApplication };

      const stepData = getWalletRegistrationStepData(application);

      expect(stepData.isComplete).toBeFalsy();
      expect(stepData.urlToPreviousStep).toBe(appRoutes.register);
    });

    test("returns 'incomplete' result when previous steps are incomplete with the previous step's URL to Documentation step", () => {
      const application: Application = {
        ...CONTACT_DETAILS_STEP_COMPLETE_APPLICATION,
      };

      const stepData = getWalletRegistrationStepData(application);

      expect(stepData.isComplete).toBeFalsy();
      expect(stepData.urlToPreviousStep).toBe(
        `${appRoutes.register}/${routes.documentation}`
      );
    });

    test("returns 'incomplete' result when previous steps are incomplete with the previous step's URL to Additional Info step", () => {
      const application: Application = {
        ...DOCUMENTATION_STEP_COMPLETE_APPLICATION,
      };

      const stepData = getWalletRegistrationStepData(application);

      expect(stepData.isComplete).toBeFalsy();
      expect(stepData.urlToPreviousStep).toBe(
        `${appRoutes.register}/${routes.additionalInformation}`
      );
    });

    test("returns 'incomplete' result when Wallet Registration data is incomplete", () => {
      const application: Application = {
        ...ADDITIONAL_INFO_STEP_COMPLETE_APPLICATION,
      };

      const stepData = getWalletRegistrationStepData(application);

      expect(stepData.isComplete).toBeFalsy();
      expect(stepData.urlToPreviousStep).toBe(
        `${appRoutes.register}/${routes.wallet}`
      );
    });
  });
});

const VALIDLY_FILLED_APPLICATION: Application = {
  ContactPerson: {
    Email: "test@test.com",
    EmailVerified: true,
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
    OrganizationName: "application",
    OrganizationName_ContactEmail: "APPLICATION_test@test.com",
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
    Logo: { name: "logo.png", publicUrl: "https://path.to.logo" },
    Overview: "text",
    EndowmentContract: "juno1ke4aktw6zvz2jxsyqx55ejsj7rmxdl9p5xywus",
    EndowmentId: 0,
    JunoWallet: "juno1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
    KycDonorsOnly: false,
  },
};

const CONTACT_DETAILS_STEP_COMPLETE_APPLICATION: Application = {
  ...placeholderApplication,
  ContactPerson: { ...VALIDLY_FILLED_APPLICATION.ContactPerson },
  Registration: {
    ...placeholderApplication.Registration,
    OrganizationName: VALIDLY_FILLED_APPLICATION.Registration.OrganizationName,
    OrganizationName_ContactEmail:
      VALIDLY_FILLED_APPLICATION.Registration.OrganizationName_ContactEmail,
    RegistrationDate: VALIDLY_FILLED_APPLICATION.Registration.RegistrationDate,
    RegistrationStatus:
      VALIDLY_FILLED_APPLICATION.Registration.RegistrationStatus,
  },
};

const DOCUMENTATION_STEP_COMPLETE_APPLICATION: Application = {
  ...VALIDLY_FILLED_APPLICATION,
  Metadata: { ...placeholderApplication.Metadata },
};

const ADDITIONAL_INFO_STEP_COMPLETE_APPLICATION: Application = {
  ContactPerson: { ...VALIDLY_FILLED_APPLICATION.ContactPerson },
  Registration: { ...VALIDLY_FILLED_APPLICATION.Registration },
  Metadata: {
    ...placeholderApplication.Metadata,
    Banner: { ...VALIDLY_FILLED_APPLICATION.Metadata.Banner! },
    Logo: { ...VALIDLY_FILLED_APPLICATION.Metadata.Logo! },
    Overview: VALIDLY_FILLED_APPLICATION.Metadata.Overview,
  },
};
