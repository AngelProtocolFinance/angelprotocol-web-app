import { memo } from "react";
import { EndowmentProfile } from "types/aws";
import Icon, { IconType } from "components/Icon";

function Status(props: {
  className: string;
  label: string;
  iconType: IconType;
}) {
  const { className, label, iconType } = props;
  return (
    <span
      className={`flex gap-1 items-center justify-center p-2 rounded-sm text-xs sm:text-sm font-semibold ${className}`}
    >
      {label} <Icon type={iconType} aria-hidden className="text-sm" />
    </span>
  );
}

type Props = {
  status: EndowmentProfile["bank_verification_status"];
};

function VerificationStatus({ status }: Props) {
  switch (status) {
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
          className="bg-yellow-l2 dark:bg-yellow text-yellow-d2 dark:text-white"
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
