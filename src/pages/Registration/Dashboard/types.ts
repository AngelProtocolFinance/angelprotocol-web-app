export enum ReviewStatus {
  None,
  UnderReview,
  Available,
  Complete,
}

export type RegistrationStatus = {
  stepOneComplete: boolean;
  stepTwoComplete: boolean;
  stepThreeComplete: boolean;
  stepFourComplete: boolean;
  reviewStatus: ReviewStatus;
};
