import { Charity } from "types/aws";
import { EndowmentTierNum } from "types/contracts";

type RegistrationStep = { completed: boolean };
type DocumentationStep = RegistrationStep & { tier?: EndowmentTierNum };

type RegistrationState = {
  contactDetails: RegistrationStep;
  documentation: DocumentationStep;
  additionalInformation: RegistrationStep;
  walletRegistration: RegistrationStep;
  emailVerificationStep: RegistrationStep;
  getIsReadyForSubmit: () => boolean;
};

export default function getRegistrationState(
  charity: Charity
): RegistrationState {
  return {
    contactDetails: { completed: !!charity.ContactPerson.PK },
    documentation: getDocumentationStepState(charity),
    additionalInformation: {
      completed:
        !!charity.Metadata.CharityLogo.publicUrl &&
        !!charity.Metadata.Banner.publicUrl &&
        !!charity.Metadata.CharityOverview,
    },
    walletRegistration: { completed: !!charity.Metadata.JunoWallet },
    emailVerificationStep: { completed: !!charity.ContactPerson.EmailVerified },
    getIsReadyForSubmit: function () {
      return (
        this.contactDetails.completed &&
        this.documentation.completed &&
        this.additionalInformation.completed &&
        this.walletRegistration.completed
      );
    },
  };
}

function getDocumentationStepState(charity: Charity): DocumentationStep {
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
