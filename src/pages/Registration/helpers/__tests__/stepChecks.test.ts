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
import {
  ADDITIONAL_INFO_STEP_COMPLETE_CHARITY,
  CONTACT_DETAILS_STEP_COMPLETE_CHARITY,
  DOCUMENTATION_STEP_COMPLETE_CHARITY,
  VALIDLY_FILLED_CHARITY,
} from "./data";

describe("stepChecks tests", () => {
  describe("getContactDetailsStepData tests", () => {
    it.each([true, false])(
      "returns 'completed' result when Contact Details data is validly set even when EmailVerified === %j",
      (emailVerified) => {
        const charity: Charity = { ...CONTACT_DETAILS_STEP_COMPLETE_CHARITY };
        charity.ContactPerson.EmailVerified = emailVerified;

        const stepData = getContactDetailsStepData(charity);

        expect(stepData.isComplete).toBeTruthy();
        expect(stepData.urlToPreviousStep).toBeUndefined();
      }
    );
  });

  describe("getDocumentationStepData tests", () => {
    test("returns 'completed' result when Documentation and previous steps' data are validly set", () => {
      const charity: Charity = { ...DOCUMENTATION_STEP_COMPLETE_CHARITY };

      const stepData = getDocumentationStepData(charity);

      expect(stepData.isComplete).toBeTruthy();
      expect(stepData.urlToPreviousStep).toBeUndefined();
    });

    test("returns 'incomplete' result when previous step is incomplete with the previous step's URL to previous step", () => {
      const charity: Charity = { ...placeholderCharity };

      const stepData = getDocumentationStepData(charity);

      expect(stepData.isComplete).toBeFalsy();
      expect(stepData.urlToPreviousStep).toBe(appRoutes.register);
    });

    test("returns 'incomplete' result when Documentation data is incomplete", () => {
      const charity: Charity = { ...CONTACT_DETAILS_STEP_COMPLETE_CHARITY };

      const stepData = getDocumentationStepData(charity);

      expect(stepData.isComplete).toBeFalsy();
      expect(stepData.urlToPreviousStep).toBe(
        `${appRoutes.register}/${routes.documentation}`
      );
    });

    describe("getAdditionalInformationStepData tests", () => {
      test("returns 'completed' result when Additional Information and previous steps' data are validly set", () => {
        const charity: Charity = { ...ADDITIONAL_INFO_STEP_COMPLETE_CHARITY };

        const stepData = getAdditionalInformationStepData(charity);

        expect(stepData.isComplete).toBeTruthy();
        expect(stepData.urlToPreviousStep).toBeUndefined();
      });

      test("returns 'incomplete' result when previous steps are incomplete with the previous step's URL to Documentation step", () => {
        const charity: Charity = { ...placeholderCharity };

        const stepData = getAdditionalInformationStepData(charity);

        expect(stepData.isComplete).toBeFalsy();
        expect(stepData.urlToPreviousStep).toBe(appRoutes.register);
      });

      test("returns 'incomplete' result when previous steps are incomplete with the previous step's URL to Documentation step", () => {
        const charity: Charity = { ...CONTACT_DETAILS_STEP_COMPLETE_CHARITY };

        const stepData = getAdditionalInformationStepData(charity);

        expect(stepData.isComplete).toBeFalsy();
        expect(stepData.urlToPreviousStep).toBe(
          `${appRoutes.register}/${routes.documentation}`
        );
      });

      test("returns 'incomplete' result when Additional Information data is incomplete", () => {
        const charity: Charity = { ...DOCUMENTATION_STEP_COMPLETE_CHARITY };

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
        const charity: Charity = { ...placeholderCharity };

        const stepData = getWalletRegistrationStepData(charity);

        expect(stepData.isComplete).toBeFalsy();
        expect(stepData.urlToPreviousStep).toBe(appRoutes.register);
      });

      test("returns 'incomplete' result when previous steps are incomplete with the previous step's URL to Documentation step", () => {
        const charity: Charity = { ...CONTACT_DETAILS_STEP_COMPLETE_CHARITY };

        const stepData = getWalletRegistrationStepData(charity);

        expect(stepData.isComplete).toBeFalsy();
        expect(stepData.urlToPreviousStep).toBe(
          `${appRoutes.register}/${routes.documentation}`
        );
      });

      test("returns 'incomplete' result when previous steps are incomplete with the previous step's URL to Documentation step", () => {
        const charity: Charity = { ...DOCUMENTATION_STEP_COMPLETE_CHARITY };

        const stepData = getWalletRegistrationStepData(charity);

        expect(stepData.isComplete).toBeFalsy();
        expect(stepData.urlToPreviousStep).toBe(
          `${appRoutes.register}/${routes.additionalInformation}`
        );
      });

      test("returns 'incomplete' result when Wallet Registration data is incomplete", () => {
        const charity: Charity = { ...ADDITIONAL_INFO_STEP_COMPLETE_CHARITY };

        const stepData = getWalletRegistrationStepData(charity);

        expect(stepData.isComplete).toBeFalsy();
        expect(stepData.urlToPreviousStep).toBe(
          `${appRoutes.register}/${routes.wallet}`
        );
      });
    });
  });
});
