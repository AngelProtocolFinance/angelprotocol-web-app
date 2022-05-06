import { EndowmentTier } from "services/aws/types";

type RegistrationStep = { completed: boolean };

type DocumentationStep = RegistrationStep & { tier?: EndowmentTier };

export type RegistrationState = {
  stepOne: RegistrationStep;
  stepTwo: RegistrationStep;
  stepThree: DocumentationStep;
  stepFour: RegistrationStep;
  getIsReadyForSubmit: () => boolean;
};
