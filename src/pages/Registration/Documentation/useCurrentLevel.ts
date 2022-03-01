import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";

export default function useCurrentLevel(
  methods: UseFormReturn<FormValues, any>
) {
  const { getFieldState } = methods;

  const [currentLevel, setCurrentLevel] = useState(0);

  const proofOfIdentityState = getFieldState("proofOfIdentity");
  const charityWebsiteState = getFieldState("charityWebsite");
  const proofOfRegistrationState = getFieldState("proofOfRegistration");
  const unSdgState = getFieldState("un_sdg");
  const financialStatementsState = getFieldState("financialStatements");
  const auditedFinancialReportState = getFieldState("auditedFinancialReport");

  useEffect(() => {
    let newLevel = 0;

    if (
      !proofOfIdentityState.error &&
      proofOfIdentityState.isDirty &&
      !charityWebsiteState.error &&
      charityWebsiteState.isDirty &&
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
    charityWebsiteState,
    proofOfRegistrationState,
    unSdgState,
    financialStatementsState,
    auditedFinancialReportState,
  ]);

  return currentLevel;
}
