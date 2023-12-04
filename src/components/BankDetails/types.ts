export type FormButtonsProps = {
  disabled?: boolean;
  isSubmitting?: boolean;
  /**
   * Indicates whether new fields were added after refreshing requirements
   */
  refreshedRequirementsAdded?: boolean;
  /**
   * Indicates whether requirements refresh is necessary.
   * See https://docs.wise.com/api-docs/api-reference/recipient#account-requirements
   */
  refreshRequired?: boolean;
  alreadySubmitted?: boolean;
};
