import { Charity } from "types/aws";
import { EndowmentTierNum } from "types/contracts";

type RegistrationStep = { completed: boolean };
type DocumentationStep = RegistrationStep & { tier?: EndowmentTierNum };

type RegistrationState = {
  stepOne: RegistrationStep;
  stepTwo: RegistrationStep;
  stepThree: DocumentationStep;
  stepFour: RegistrationStep;
  emailVerificationStep: RegistrationStep;
  getIsReadyForSubmit: () => boolean;
};

export default function getRegistrationState(
  charity: Charity
): RegistrationState {
  return {
    stepOne: { completed: !!charity.ContactPerson.PK },
    stepTwo: getStepThree(charity),
    stepThree: {
      completed:
        !!charity.Metadata.CharityLogo.publicUrl &&
        !!charity.Metadata.Banner.publicUrl &&
        !!charity.Metadata.CharityOverview,
    },
    stepFour: { completed: !!charity.Metadata.JunoWallet },
    emailVerificationStep: { completed: !!charity.ContactPerson.EmailVerified },
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

function getStepThree(charity: Charity) {
  const levelOneDataExists =
    !!charity.Registration.ProofOfIdentity.publicUrl &&
    !!charity.Registration.ProofOfRegistration.publicUrl &&
    !!charity.Registration.Website;

  const levelTwoDataExists =
    !!charity.Registration.FinancialStatements.length &&
    (charity.Registration.UN_SDG || -1) >= 0;

  const levelThreeDataExists =
    !!charity.Registration.AuditedFinancialReports.length;

  const tier: EndowmentTierNum | undefined = levelOneDataExists
    ? levelTwoDataExists
      ? levelThreeDataExists
        ? 3
        : 2
      : 1
    : undefined;

  return { completed: levelOneDataExists, tier };
}
