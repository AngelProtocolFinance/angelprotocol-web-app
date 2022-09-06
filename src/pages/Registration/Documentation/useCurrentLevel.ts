import { UseFormReturn, useFormContext } from "react-hook-form";
import { DocumentationValues } from "pages/Registration/types";
import { FileWrapper } from "components/FileDropzone";

export default function useCurrentLevel() {
  const methods = useFormContext<DocumentationValues>();

  const level = getCurrentLevel(methods);

  return level;
}

function getCurrentLevel(methods: UseFormReturn<DocumentationValues, any>) {
  let newLevel = 0;

  // level checks are nested since subsequent levels can't be reached
  // unless previous ones are reached first (can'b get level 2 if level 1 is not reached)
  if (getIsLevelOne(methods)) {
    newLevel = 1;

    if (getIsLevelTwo(methods)) {
      newLevel = 2;

      if (getIsLevelThree(methods)) {
        newLevel = 3;
      }
    }
  }

  return newLevel;
}

const getIsLevelOne = ({ control }: UseFormReturn<DocumentationValues, any>) =>
  // no errors
  !control._formState.errors.proofOfIdentity &&
  !control._formState.errors.website &&
  !control._formState.errors.proofOfRegistration &&
  // values inserted
  control._formValues.proofOfIdentity.name &&
  control._formValues.website &&
  control._formValues.proofOfRegistration.name;

const getIsLevelTwo = ({ control }: UseFormReturn<DocumentationValues, any>) =>
  // no errors
  !control._formState.errors.un_sdg &&
  !control._formState.errors.financialStatements &&
  // values inserted
  control._formValues.un_sdg >= 0 &&
  control._formValues.financialStatements.some((fs: FileWrapper) => fs.name);

const getIsLevelThree = ({
  control,
}: UseFormReturn<DocumentationValues, any>) =>
  // no errors
  !control._formState.errors.auditedFinancialReports &&
  // values inserted
  control._formValues.auditedFinancialReports.some(
    (fs: FileWrapper) => fs.name
  );
