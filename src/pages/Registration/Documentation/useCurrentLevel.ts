import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";

export default function useCurrentLevel({
  getFieldState,
}: UseFormReturn<FormValues, any>) {
  const [currentLevel, setCurrentLevel] = useState(0);

  const proofOfIdentityState = getFieldState("proofOfIdentity");
  const websiteState = getFieldState("website");
  const proofOfRegistrationState = getFieldState("proofOfRegistration");
  const unSdgState = getFieldState("un_sdg");
  const financialStatementsState = getFieldState("financialStatements");
  const auditedFinancialReportState = getFieldState("auditedFinancialReports");

  useEffect(() => {
    let newLevel = 0;

    if (
      !proofOfIdentityState.error &&
      proofOfIdentityState.isDirty &&
      !websiteState.error &&
      websiteState.isDirty &&
      !proofOfRegistrationState.error &&
      proofOfRegistrationState.isDirty
    ) {
      newLevel = 1;
    }

    if (
      newLevel === 1 &&
      !unSdgState.error &&
      unSdgState.isDirty &&
      !financialStatementsState.error &&
      financialStatementsState.isDirty
    ) {
      newLevel = 2;
    }

    if (
      newLevel === 2 &&
      !auditedFinancialReportState.error &&
      auditedFinancialReportState.isDirty
    ) {
      newLevel = 3;
    }

    if (newLevel !== currentLevel) {
      setCurrentLevel(newLevel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getFieldState,
    proofOfIdentityState,
    websiteState,
    proofOfRegistrationState,
    unSdgState,
    financialStatementsState,
    auditedFinancialReportState,
  ]);

  return currentLevel;
}
