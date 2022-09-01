import { Charity } from "types/aws";
import routes from "pages/Registration/routes";
import { placeholderCharity } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import {
  getAdditionalInformationStepData,
  getContactDetailsStepData,
  getDocumentationStepData,
  getWalletRegistrationStepData,
} from "../stepChecks";
import { VALIDLY_FILLED_CHARITY } from "./data";

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

    describe("getAdditionalInformationStepData tests", () => {
      test("returns 'completed' result when Additional Information and previous steps' data are validly set", () => {
        const charity: Charity = {
          ContactPerson: { ...VALIDLY_FILLED_CHARITY.ContactPerson },
          Registration: { ...VALIDLY_FILLED_CHARITY.Registration },
          Metadata: {
            ...placeholderCharity.Metadata,
            Banner: { ...VALIDLY_FILLED_CHARITY.Metadata.Banner },
            CharityLogo: { ...VALIDLY_FILLED_CHARITY.Metadata.CharityLogo },
            CharityOverview: VALIDLY_FILLED_CHARITY.Metadata.CharityOverview,
          },
        };

        const stepData = getAdditionalInformationStepData(charity);

        expect(stepData.isComplete).toBeTruthy();
        expect(stepData.urlToPreviousStep).toBeUndefined();
      });

      test("returns 'incomplete' result when previous steps are incomplete with the previous step's URL to Documentation step", () => {
        const charity: Charity = {
          ...placeholderCharity,
        };

        const stepData = getAdditionalInformationStepData(charity);

        expect(stepData.isComplete).toBeFalsy();
        expect(stepData.urlToPreviousStep).toBe(appRoutes.register);
      });

      test("returns 'incomplete' result when previous steps are incomplete with the previous step's URL to Documentation step", () => {
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

        const stepData = getAdditionalInformationStepData(charity);

        expect(stepData.isComplete).toBeFalsy();
        expect(stepData.urlToPreviousStep).toBe(
          `${appRoutes.register}/${routes.documentation}`
        );
      });

      test("returns 'incomplete' result when Additional Information data is incomplete", () => {
        const charity: Charity = {
          ...VALIDLY_FILLED_CHARITY,
          Metadata: {
            ...placeholderCharity.Metadata,
          },
        };

        const stepData = getAdditionalInformationStepData(charity);

        expect(stepData.isComplete).toBeFalsy();
        expect(stepData.urlToPreviousStep).toBe(
          `${appRoutes.register}/${routes.additionalInformation}`
        );
      });
    });

    describe("getWalletRegistrationStepData tests", () => {
      test("returns 'completed' result when all steps' data is validly set", () => {
        const charity: Charity = { ...VALIDLY_FILLED_CHARITY };

        const stepData = getWalletRegistrationStepData(charity);

        expect(stepData.isComplete).toBeTruthy();
        expect(stepData.urlToPreviousStep).toBeUndefined();
      });

      test("returns 'incomplete' result when previous steps are incomplete with the previous step's URL to Documentation step", () => {
        const charity: Charity = {
          ...placeholderCharity,
        };

        const stepData = getWalletRegistrationStepData(charity);

        expect(stepData.isComplete).toBeFalsy();
        expect(stepData.urlToPreviousStep).toBe(appRoutes.register);
      });

      test("returns 'incomplete' result when previous steps are incomplete with the previous step's URL to Documentation step", () => {
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

        const stepData = getWalletRegistrationStepData(charity);

        expect(stepData.isComplete).toBeFalsy();
        expect(stepData.urlToPreviousStep).toBe(
          `${appRoutes.register}/${routes.documentation}`
        );
      });

      test("returns 'incomplete' result when previous steps are incomplete with the previous step's URL to Documentation step", () => {
        const charity: Charity = {
          ...VALIDLY_FILLED_CHARITY,
          Metadata: { ...placeholderCharity.Metadata },
        };

        const stepData = getWalletRegistrationStepData(charity);

        expect(stepData.isComplete).toBeFalsy();
        expect(stepData.urlToPreviousStep).toBe(
          `${appRoutes.register}/${routes.additionalInformation}`
        );
      });

      test("returns 'incomplete' result when Wallet Registration data is incomplete", () => {
        const charity: Charity = {
          ...VALIDLY_FILLED_CHARITY,
          Metadata: {
            ...placeholderCharity.Metadata,
            Banner: { ...VALIDLY_FILLED_CHARITY.Metadata.Banner },
            CharityLogo: { ...VALIDLY_FILLED_CHARITY.Metadata.CharityLogo },
            CharityOverview: VALIDLY_FILLED_CHARITY.Metadata.CharityOverview,
          },
        };

        const stepData = getWalletRegistrationStepData(charity);

        expect(stepData.isComplete).toBeFalsy();
        expect(stepData.urlToPreviousStep).toBe(
          `${appRoutes.register}/${routes.wallet}`
        );
      });
    });
  });
});
