import { Application } from "types/aws";
import { appRoutes } from "constants/routes";
import routes from "../routes";

type StepData =
  | {
      isComplete: true;
      urlToPreviousStep: undefined;
    }
  | {
      isComplete: false;
      urlToPreviousStep: string;
    };

export function getContactDetailsStepData(application: Application): StepData {
  return !!application.ContactPerson.Email &&
    !!application.ContactPerson.FirstName &&
    !!application.ContactPerson.LastName &&
    !!application.ContactPerson.Goals &&
    !!application.ContactPerson.Role &&
    !!application.Registration.OrganizationName &&
    !!application.Registration.OrganizationName_ContactEmail
    ? createComplete()
    : createIncomplete(appRoutes.register);
}

export function getDocumentationStepData(application: Application): StepData {
  const contactDetailsStepData = getContactDetailsStepData(application);

  if (!contactDetailsStepData.isComplete) {
    return contactDetailsStepData;
  }

  return !!application.Registration.Tier &&
    !!application.Registration.Website &&
    !!application.Registration.ProofOfIdentity &&
    !!application.Registration.ProofOfRegistration
    ? createComplete()
    : createIncomplete(`${appRoutes.register}/${routes.documentation}`);
}

export function getAdditionalInformationStepData(
  application: Application
): StepData {
  const documentationStepData = getDocumentationStepData(application);

  if (!documentationStepData.isComplete) {
    return documentationStepData;
  }

  return !!application.Metadata.Banner &&
    !!application.Metadata.Logo &&
    !!application.Metadata.Overview
    ? createComplete()
    : createIncomplete(`${appRoutes.register}/${routes.additionalInformation}`);
}

export function getWalletRegistrationStepData(
  application: Application
): StepData {
  const additionalInformationStepData =
    getAdditionalInformationStepData(application);

  if (!additionalInformationStepData.isComplete) {
    return additionalInformationStepData;
  }

  return !!application.Metadata.JunoWallet
    ? createComplete()
    : createIncomplete(`${appRoutes.register}/${routes.wallet}`);
}

export function getEmailVerificationStepData(
  application: Application
): StepData {
  return application.ContactPerson.EmailVerified
    ? createComplete()
    : createIncomplete(`${appRoutes.register}/${routes.confirmEmail}`);
}

const createComplete = (): StepData => ({
  isComplete: true,
  urlToPreviousStep: undefined,
});

const createIncomplete = (url: string): StepData => ({
  isComplete: false,
  urlToPreviousStep: url,
});
