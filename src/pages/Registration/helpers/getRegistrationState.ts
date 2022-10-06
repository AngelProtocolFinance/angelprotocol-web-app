import { Application } from "types/aws";
import {
  getAdditionalInformationStepData,
  getContactDetailsStepData,
  getDocumentationStepData,
  getEmailVerificationStepData,
  getWalletRegistrationStepData,
} from "./stepChecks";

type RegistrationStep = { isComplete: boolean };

type RegistrationState = {
  contactDetails: RegistrationStep;
  documentation: RegistrationStep;
  additionalInformation: RegistrationStep;
  walletRegistration: RegistrationStep;
  emailVerification: RegistrationStep;
  getIsReadyForSubmit: () => boolean;
};

export function getRegistrationState(
  application: Application
): RegistrationState {
  return {
    contactDetails: getContactDetailsStepData(application),
    documentation: getDocumentationStepData(application),
    additionalInformation: getAdditionalInformationStepData(application),
    walletRegistration: getWalletRegistrationStepData(application),
    emailVerification: getEmailVerificationStepData(application),
    getIsReadyForSubmit: function () {
      return (
        this.contactDetails.isComplete &&
        this.documentation.isComplete &&
        this.additionalInformation.isComplete &&
        this.walletRegistration.isComplete &&
        this.emailVerification.isComplete
      );
    },
  };
}
