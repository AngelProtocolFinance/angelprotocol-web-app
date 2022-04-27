import { Charity, EndowmentTier, FileObject } from "services/aws/types";

const isString = (data: string | FileObject) => typeof data === "string";

export default function getRegistrationState(
  charity: Charity
): RegistrationState {
  const logo = isString(charity.Metadata.CharityLogo)
    ? charity.Metadata.CharityLogo
    : (charity.Metadata.CharityLogo as FileObject)?.sourceUrl;

  const banner = isString(charity.Metadata.Banner)
    ? charity.Metadata.Banner
    : (charity.Metadata.Banner as FileObject)?.sourceUrl;

  return {
    stepOne: { completed: !!charity.ContactPerson.PK },
    stepTwo: { completed: !!charity.Metadata.TerraWallet },
    stepThree: getStepThree(charity),
    stepFour: {
      completed: !!logo && !!banner && !!charity.Metadata.CharityOverview,
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
  const ProofOfIdentity = isString(charity.Registration.ProofOfIdentity)
    ? charity.Registration.ProofOfIdentity
    : (charity.Registration.ProofOfIdentity as FileObject)?.sourceUrl;

  const ProofOfRegistration = isString(charity.Registration.ProofOfRegistration)
    ? charity.Registration.ProofOfRegistration
    : (charity.Registration.ProofOfRegistration as FileObject)?.sourceUrl;

  const levelOneDataExists =
    !!ProofOfIdentity &&
    !!ProofOfRegistration &&
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
