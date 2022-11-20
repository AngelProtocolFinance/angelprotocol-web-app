import { useFormContext } from "react-hook-form";
import { FormValues } from "../../types";
import { Asset } from "components/registration";
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

  const status: { [key in TLevel]: boolean } = {
    1: false,
    2: false,
    3: false,
  };

  status[1] =
    hasFiles(poi) &&
    hasFiles(por) &&
    !!website &&
    sdgs.length > 0 &&
    [poiErr, porErr, websiteErr, sdgsErr].every((err) => !err);

  status[2] = status[1] && hasFiles(fs) && !fsErr;
  status[3] =
    status[2] && hasFiles(afr) && !afrErr && isKYCRequired !== undefined;

  return status[level];
}

function hasFiles(field: Asset): boolean {
  return field.files.length > 0 || field.previews.length > 0;
}
