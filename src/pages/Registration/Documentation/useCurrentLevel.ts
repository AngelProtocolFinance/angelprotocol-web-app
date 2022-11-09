import { useEffect, useState } from "react";
import { UseFormReturn, useFormContext } from "react-hook-form";
import { DocumentationValues } from "pages/Registration/types";
import { Asset } from "components/FileDropzone";

type Level = 0 | 1 | 2 | 3;

export default function useCurrentLevel() {
  const [level, setLevel] = useState<Level>(0);
  const methods = useFormContext<DocumentationValues>();

  const poi = methods.watch("proofOfIdentity");
  const website = methods.watch("website");
  const por = methods.watch("proofOfRegistration");
  const un_sdg = methods.watch("un_sdg");
  const fs = methods.watch("financialStatements");
  const afr = methods.watch("auditedFinancialReports");

  useEffect(() => {
    let currentLevel: Level = 0;

    // level checks are nested since subsequent levels can't be reached
    // unless previous ones are reached first (can'b get level 2 if level 1 is not reached)
    if (getIsLevelOne(un_sdg, poi, website, por, methods)) {
      currentLevel = 1;

      if (getIsLevelTwo(fs, methods)) {
        currentLevel = 2;

        if (getIsLevelThree(afr, methods)) {
          currentLevel = 3;
        }
      }
    }

    if (currentLevel !== level) {
      setLevel(currentLevel);
    }
  }, [level, poi, website, por, un_sdg, fs, afr, methods]);

  return level;
}

const getIsLevelOne = (
  un_sdg: number,
  proofOfIdentity: Asset,
  website: string,
  proofOfRegistration: Asset,
  { getFieldState }: UseFormReturn<DocumentationValues, any>
): boolean =>
  // no errors
  !getFieldState("proofOfIdentity").error &&
  !getFieldState("website").error &&
  !getFieldState("proofOfRegistration").error &&
  !getFieldState("un_sdg").error &&
  // values inserted
  un_sdg > 0 &&
  proofOfIdentity.files.some((f) => f) &&
  !!website &&
  proofOfRegistration.files.some((f) => f);

const getIsLevelTwo = (
  financialStatements: Asset,
  { getFieldState }: UseFormReturn<DocumentationValues, any>
): boolean =>
  // no errors
  !getFieldState("financialStatements").error &&
  // values inserted
  financialStatements.files.some((fs) => !!fs);

const getIsLevelThree = (
  auditedFinancialReports: Asset,
  { getFieldState }: UseFormReturn<DocumentationValues, any>
): boolean =>
  // no errors
  !getFieldState("auditedFinancialReports").error &&
  // values inserted
  auditedFinancialReports.files.some((fs) => !!fs);
