export enum ReviewStatus {
  None,
  UnderReview,
  Available,
  Complete,
}

export type RegistrationStatus = {
  stepOneCompleted: boolean;
  stepTwoCompleted: boolean;
  stepThreeCompleted: boolean;
  stepFourCompleted: boolean;
  getReadyForSubmit: () => boolean;
  reviewStatus: ReviewStatus;
};
