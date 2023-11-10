import { memo, useEffect } from "react";
import { useAdminContext } from "pages/Admin/Context";
import { useProfileQuery } from "services/aws/aws";
import { useErrorContext } from "contexts/ErrorContext";
import Icon from "components/Icon";
import LoaderRing from "components/LoaderRing";
import { EMAIL_SUPPORT } from "constants/env";

const PROFILE_ERROR = `Error loading profile. Please try again later. If the error persists,
please contact ${EMAIL_SUPPORT}.`;

function VerificationStatus() {
  const { id } = useAdminContext();
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useProfileQuery({
    endowId: id,
  });
  const { handleError } = useErrorContext();

  useEffect(() => {
    if (error) {
      handleError(error, PROFILE_ERROR);
    }
  }, [error, handleError]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <LoaderRing thickness={10} classes="w-6" /> Loading...
      </div>
    );
  }

  if (isError || !profile) {
    return <span>{PROFILE_ERROR}</span>;
  }

  switch (profile.bank_verified) {
    case "Not Submitted":
      return (
        <span className="flex gap-1 items-center text-xs bg-gray-l3 sm:text-sm font-semibold px-2 rounded">
          Not submitted{" "}
          <Icon type="Exclamation" aria-hidden className="text-sm" />
        </span>
      );
    case "Under Review":
      return (
        <span className="flex gap-1 items-center bg-red-l4 text-xs sm:text-sm text-red-d1 font-semibold px-2 rounded">
          Under review{" "}
          <Icon type="HourglassSplit" aria-hidden className="text-sm" />
        </span>
      );
    case "Approved":
      return (
        <span className="flex gap-1 items-center bg-green-l3 text-xs sm:text-sm text-green-d2 font-semibold px-2 rounded">
          Approved{" "}
          <Icon type="Check" aria-hidden className="text-xl sm:text-2xl" />
        </span>
      );
    case "Rejected":
      return (
        <span className="flex gap-1 items-center bg-red-l4 text-xs sm:text-sm text-red-d1 font-semibold px-2 rounded">
          Rejected{" "}
          <Icon type="ExclamationCircleFill" aria-hidden className="text-sm" />
        </span>
      );
    default:
      return (
        <span className="flex items-center text-red text-sm">
          error, no bank status present
        </span>
      );
  }
}

export default memo(VerificationStatus);
