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
  return !!charity.ContactPerson.Email
    ? createComplete()
    : createIncomplete(appRoutes.register);
}

export function getDocumentationStepData(charity: Charity): StepData {
  const contactDetailsStepData = getContactDetailsStepData(charity);

  if (!contactDetailsStepData.isComplete) {
    return contactDetailsStepData;
  }

  // No Charity tier set means documentation step wasn't complete
  return !!charity.Registration.Tier
    ? createComplete()
    : createIncomplete(`${appRoutes.register}/${routes.documentation}`);
}

export function getAdditionalInformationStepData(charity: Charity): StepData {
  const documentationStepData = getDocumentationStepData(charity);

  if (!documentationStepData.isComplete) {
    return documentationStepData;
  }

  // No Charity banner public URL set means additional information step wasn't complete
  return !!charity.Metadata.Banner.publicUrl
    ? createComplete()
    : createIncomplete(`${appRoutes.register}/${routes.additionalInformation}`);
}

export function getWalletRegistrationStepData(charity: Charity): StepData {
  const additionalInformationStepData =
    getAdditionalInformationStepData(charity);

  if (!additionalInformationStepData.isComplete) {
    return additionalInformationStepData;
  }

  // No registered Charity wallet set means step 4 wasn't complete
  return !!charity.Metadata.JunoWallet
    ? createComplete()
    : createIncomplete(`${appRoutes.register}/${routes.wallet}`);
}

const createComplete = (): StepData => ({
  isComplete: true,
  urlToPreviousStep: undefined,
});

const createIncomplete = (url: string): StepData => ({
  isComplete: false,
  urlToPreviousStep: url,
});
