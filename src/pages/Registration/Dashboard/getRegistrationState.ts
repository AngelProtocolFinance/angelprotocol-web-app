import { Charity } from "types/aws";
import {
  getAdditionalInformationStepData,
  getContactDetailsStepData,
  getDocumentationStepData,
  getEmailVerificationStepData,
  getWalletRegistrationStepData,
} from "../guards/stepChecks";

type RegistrationStep = { isComplete: boolean };

type RegistrationState = {
  contactDetails: RegistrationStep;
  documentation: RegistrationStep;
  additionalInformation: RegistrationStep;
  walletRegistration: RegistrationStep;
  emailVerification: RegistrationStep;
  getIsReadyForSubmit: () => boolean;
};

export default function getRegistrationState(
  charity: Charity
): RegistrationState {
  return {
    contactDetails: getContactDetailsStepData(charity),
    documentation: getDocumentationStepData(charity),
    additionalInformation: getAdditionalInformationStepData(charity),
    walletRegistration: getWalletRegistrationStepData(charity),
    emailVerification: getEmailVerificationStepData(charity),
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
