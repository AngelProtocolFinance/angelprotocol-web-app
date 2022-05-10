import { Charity, EndowmentTier } from "services/aws/types";
import { RegistrationState } from "./types";

export default function getRegistrationState(
  charity: Charity
): RegistrationState {
  return {
    stepOne: { completed: !!charity.ContactPerson.PK },
    stepTwo: { completed: !!charity.Metadata.TerraWallet },
    stepThree: getStepThree(charity),
    stepFour: {
      completed:
        !!charity.Metadata.CharityLogo.publicUrl &&
        !!charity.Metadata.Banner.publicUrl &&
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

  const tier: EndowmentTier | undefined = levelOneDataExists
    ? levelTwoDataExists
      ? levelThreeDataExists
        ? 3
        : 2
      : 1
    : undefined;

  return { completed: levelOneDataExists, tier };
}
