import { Charity, EndowmentTier } from "services/aws/types";

export default function getRegistrationState(
  charity: Charity
): RegistrationState {
  return {
    stepOne: { completed: !!charity.ContactPerson.PK },
    stepTwo: { completed: !!charity.Metadata.TerraWallet },
    stepThree: getStepThree(charity),
    stepFour: {
      completed:
        !!charity.Metadata.CharityLogo?.sourceUrl &&
        !!charity.Metadata.Banner?.sourceUrl &&
        !!charity.Metadata.CharityOverview,
    },
    getIsReadyForSubmit: function () {
      return (
        this.stepOne.completed &&
        this.stepTwo.completed &&
        this.stepThree.completed &&
        this.stepFour.completed
      );
    },
  };
}

function getStepThree(charity: Charity): DocumentationStep {
  const levelOneDataExists =
    !!charity.Registration.ProofOfIdentity?.sourceUrl &&
    !!charity.Registration.ProofOfRegistration?.sourceUrl &&
    !!charity.Registration.Website;

  const levelTwoDataExists =
    !!charity.Registration.FinancialStatements?.length &&
    (charity.Registration.UN_SDG || -1) >= 0;

  const levelThreeDataExists =
    !!charity.Registration.AuditedFinancialReports?.length;

  const tier = levelOneDataExists
    ? levelTwoDataExists
      ? levelThreeDataExists
        ? 3
        : 2
      : 1
    : undefined;

  return { completed: levelOneDataExists, tier };
}

type RegistrationStep = { completed: boolean };

type DocumentationStep = RegistrationStep & { tier?: EndowmentTier };

type RegistrationState = {
  stepOne: RegistrationStep;
  stepTwo: RegistrationStep;
  stepThree: DocumentationStep;
  stepFour: RegistrationStep;
  getIsReadyForSubmit: () => boolean;
};
