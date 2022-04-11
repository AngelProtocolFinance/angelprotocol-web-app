import { User } from "services/user/types";
import { RegistrationStatus, ReviewStatus } from "./types";

export default function getRegistrationStatus(user: User): RegistrationStatus {
  return {
    stepOne: { completed: !!user.PK },
    stepTwo: { completed: !!user.Metadata.TerraWallet },
    stepThree: getStepThree(user),
    stepFour: {
      completed:
        !!user.Metadata.CharityLogo &&
        !!user.Metadata.CharityBanner &&
        !!user.Metadata.CharityOverview,
    },
    reviewStatus:
      user?.RegistrationStatus === "Complete"
        ? ReviewStatus.Complete
        : user?.RegistrationStatus === "Active"
        ? ReviewStatus.Available
        : user.IsMetaDataCompleted
        ? ReviewStatus.UnderReview
        : ReviewStatus.None,
    getReadyForSubmit: function () {
      return (
        this.stepOne.completed &&
        this.stepTwo.completed &&
        this.stepThree.completed &&
        this.stepFour.completed
      );
    },
  };
}

function getStepThree(user: User) {
  const levelOneDataExists =
    !!user.ProofOfIdentity?.length &&
    !!user.ProofOfRegistration?.length &&
    !!user.Website;
  const levelTwoDataExists =
    !!user.FinancialStatements?.length && (user.UN_SDG || -1) >= 0;
  const levelThreeDataExists = !!user.AuditedFinancialReports?.length;

  const level = levelOneDataExists
    ? levelTwoDataExists
      ? levelThreeDataExists
        ? 3
        : 2
      : 1
    : 0;

  return { completed: levelOneDataExists, level };
}
