import { Charity } from "types/aws";
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

export function getContactDetailsStepData(charity: Charity): StepData {
  return !!charity.ContactPerson.Email &&
    !!charity.ContactPerson.FirstName &&
    !!charity.ContactPerson.LastName &&
    !!charity.ContactPerson.Goals &&
    !!charity.ContactPerson.Role &&
    !!charity.Registration.CharityName &&
    !!charity.Registration.CharityName_ContactEmail
    ? createComplete()
    : createIncomplete(appRoutes.register);
}

export function getDocumentationStepData(charity: Charity): StepData {
  const contactDetailsStepData = getContactDetailsStepData(charity);

  if (!contactDetailsStepData.isComplete) {
    return contactDetailsStepData;
  }

  return !!charity.Registration.Tier &&
    !!charity.Registration.Website &&
    !!charity.Registration.ProofOfIdentity &&
    !!charity.Registration.ProofOfRegistration
    ? createComplete()
    : createIncomplete(`${appRoutes.register}/${routes.documentation}`);
}

export function getAdditionalInformationStepData(charity: Charity): StepData {
  const documentationStepData = getDocumentationStepData(charity);

  if (!documentationStepData.isComplete) {
    return documentationStepData;
  }

  return !!charity.Metadata.Banner &&
    !!charity.Metadata.Logo &&
    !!charity.Metadata.CharityOverview
    ? createComplete()
    : createIncomplete(`${appRoutes.register}/${routes.additionalInformation}`);
}

export function getWalletRegistrationStepData(charity: Charity): StepData {
  const additionalInformationStepData =
    getAdditionalInformationStepData(charity);

  if (!additionalInformationStepData.isComplete) {
    return additionalInformationStepData;
  }

  return !!charity.Metadata.JunoWallet
    ? createComplete()
    : createIncomplete(`${appRoutes.register}/${routes.wallet}`);
}

export function getEmailVerificationStepData(charity: Charity): StepData {
  return charity.ContactPerson.EmailVerified
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
