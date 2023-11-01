import { memo, useEffect } from "react";
import { useAdminContext } from "pages/Admin/Context";
import { useProfileQuery } from "services/aws/aws";
import { useErrorContext } from "contexts/ErrorContext";
import Icon, { IconType } from "components/Icon";
import LoaderRing from "components/LoaderRing";
import { EMAIL_SUPPORT } from "constants/env";

const PROFILE_ERROR = `Error loading profile. Please try again later. If the error persists,
please contact ${EMAIL_SUPPORT}.`;

function Status(props: {
  className: string;
  label: string;
  iconType: IconType;
}) {
  const { className, label, iconType } = props;
  return (
    <span
      className={`flex gap-1 items-center justify-center w-36 p-2 rounded text-xs sm:text-sm font-semibold ${className}`}
    >
      {label} <Icon type={iconType} aria-hidden className="text-sm" />
    </span>
  );
}

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
        <Status
          className="bg-gray-l4 dark:bg-gray"
          label="Not Submitted"
          iconType="Exclamation"
        />
      );
    case "Under Review":
      return (
        <Status
          className="bg-orange-l4 dark:bg-orange-l1 text-orange-d1 dark:text-white"
          label="Under Review"
          iconType="HourglassSplit"
        />
      );
    case "Approved":
      return (
        <Status
          className="bg-green-l3 dark:bg-green-d1 text-green-d2 dark:text-white"
          label="Approved"
          iconType="Check"
        />
      );
    case "Rejected":
      return (
        <Status
          className="bg-red-l4 dark:bg-red-l1 text-red-d1 dark:text-white"
          label="Rejected"
          iconType="ExclamationCircleFill"
        />
      );
    default:
      return (
        <span className="flex items-center text-red dark:text-red-l2 text-sm">
          error, no bank status present
        </span>
      );
  }
}

export default memo(VerificationStatus);
