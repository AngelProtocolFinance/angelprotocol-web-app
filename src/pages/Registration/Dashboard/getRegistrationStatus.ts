import { User } from "services/user/types";
import { RegistrationStatus, ReviewStatus } from "./types";

export default function getRegistrationStatus(
  user: User,
  data: any
): RegistrationStatus {
  return {
    stepOne: { completed: !!user.PK },
    stepTwo: { completed: !!user.TerraWallet || !!data?.Metadata?.TerraWallet },
    stepThree: getStepThree(user, data),
    stepFour: { completed: !!user.CharityLogo },
    reviewStatus:
      user?.RegistrationStatus === "Complete"
        ? ReviewStatus.Complete
        : data?.Metadata?.EndowmentStatus === "Active"
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

function getStepThree(user: User, data: any) {
  const levelOneDataExists = getLevelOneDataExists(user, data);
  const levelTwoDataExists = getLevelTwoDataExists(user, data);
  const levelThreeDataExists = getLevelThreeDataExists(user, data);

  const level = levelOneDataExists
    ? levelTwoDataExists
      ? levelThreeDataExists
        ? 3
        : 2
      : 1
    : 0;

  return { completed: levelOneDataExists, level };
}

const getLevelOneDataExists = (user: User, data: any) =>
  (user.ProofOfIdentity?.length ||
    data?.Registration?.ProofOfIdentity?.length) &&
  (user.ProofOfRegistration?.length ||
    data?.Registration?.ProofOfRegistration?.length) &&
  (user.Website || data?.Registration?.Website);

const getLevelTwoDataExists = (user: User, data: any) =>
  (user.FinancialStatements?.length ||
    data?.Registration?.FinancialStatements?.length) &&
  ((user.UN_SDG || -1) >= 0 || (data?.Registration?.UN_SDG || -1) >= 0);

const getLevelThreeDataExists = (user: User, data: any) =>
  user.AuditedFinancialReports?.length ||
  data?.Registration?.FinancialStatements?.length;
