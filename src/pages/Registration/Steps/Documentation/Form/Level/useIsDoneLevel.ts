import { useFormContext } from "react-hook-form";
import { FormValues } from "../../types";
import { Asset } from "components/FileDropzone";
import { TLevel } from ".";

export default function useIsDoneLevel(level: TLevel): boolean {
  const {
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();

  const {
    //level1
    proofOfIdentity: poi,
    proofOfRegistration: por,
    website,
    sdgs,

    //level2
    financialStatements: fs,

    //level3
    auditedFinancialReports: afr,
    isKYCRequired,
  } = watch();

  const {
    //level1
    proofOfIdentity: poiErr,
    proofOfRegistration: porErr,
    website: websiteErr,
    sdgs: sdgsErr,

    //level2
    financialStatements: fsErr,

    //level3
    auditedFinancialReports: afrErr,
  } = errors;

  const is1Filled =
    hasFiles(poi) && hasFiles(por) && !!website && sdgs.length > 0;
  const is1ErrorFree = [poiErr, porErr, websiteErr, sdgsErr].every(
    (err) => !err
  );
  const is1Done = is1Filled && is1ErrorFree;
  const is2Done = is1Done && hasFiles(fs) && !fsErr;
  const is3Done =
    is2Done && hasFiles(afr) && !afrErr && isKYCRequired !== undefined;

  const _level = 3 - [is3Done, is2Done, is1Done].findIndex((v) => v);
  console.log({ _level });
  return _level === level;
}

function hasFiles(field: Asset): boolean {
  return field.files.length > 0 || field.previews.length > 0;
}
