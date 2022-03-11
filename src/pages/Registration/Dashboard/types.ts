export enum ReviewStatus {
  None,
  UnderReview,
  Available,
  Complete,
}

type Step = { completed: boolean };
type DocumentationStep = Step & { level: number };

export type RegistrationStatus = {
  stepOne: Step;
  stepTwo: Step;
  stepThree: DocumentationStep;
  stepFour: Step;
  getReadyForSubmit: () => boolean;
  reviewStatus: ReviewStatus;
};
