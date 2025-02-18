import { STATUS_STYLES } from "./constants";
import type { OutreachStatus } from "./types";

interface StatusBadgeProps {
  status: OutreachStatus;
  className?: string;
}

export const StatusBadge = ({ status, className = "" }: StatusBadgeProps) => {
  const styles = STATUS_STYLES[status];

  return (
    <span
      className={`
        px-2 py-1 
        rounded-full 
        text-sm 
        font-medium 
        ${styles.bg} 
        ${styles.text} 
        ${className}
      `}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
