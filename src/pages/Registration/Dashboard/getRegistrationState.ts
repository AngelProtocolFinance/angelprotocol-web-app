import { Charity } from "types/aws";

type RegistrationStep = { isComplete: boolean };

type RegistrationState = {
  contactDetails: RegistrationStep;
  documentation: RegistrationStep;
  additionalInformation: RegistrationStep;
  walletRegistration: RegistrationStep;
  emailVerificationStep: RegistrationStep;
  getIsReadyForSubmit: () => boolean;
};

export default function getRegistrationState(
  charity: Charity
): RegistrationState {
  return {
    contactDetails: { isComplete: !!charity.ContactPerson.PK },
    documentation: {
      isComplete:
        !!charity.Registration.ProofOfIdentity.publicUrl &&
        !!charity.Registration.ProofOfRegistration.publicUrl &&
        !!charity.Registration.Website,
    },
    additionalInformation: {
      isComplete:
        !!charity.Metadata.CharityLogo.publicUrl &&
        !!charity.Metadata.Banner.publicUrl &&
        !!charity.Metadata.CharityOverview,
    },
    walletRegistration: { isComplete: !!charity.Metadata.JunoWallet },
    emailVerificationStep: {
      isComplete: !!charity.ContactPerson.EmailVerified,
    },
    getIsReadyForSubmit: function () {
      return (
        this.contactDetails.isComplete &&
        this.documentation.isComplete &&
        this.additionalInformation.isComplete &&
        this.walletRegistration.isComplete
      );
    },
  };
}
