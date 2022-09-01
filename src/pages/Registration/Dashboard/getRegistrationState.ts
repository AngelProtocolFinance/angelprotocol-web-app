import { Charity } from "types/aws";

type RegistrationStep = { completed: boolean };

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
    contactDetails: { completed: !!charity.ContactPerson.PK },
    documentation: {
      completed:
        !!charity.Registration.ProofOfIdentity.publicUrl &&
        !!charity.Registration.ProofOfRegistration.publicUrl &&
        !!charity.Registration.Website,
    },
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
