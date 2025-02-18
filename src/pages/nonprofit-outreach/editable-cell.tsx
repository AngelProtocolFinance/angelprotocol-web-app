import { OUTREACH_STATUSES } from "./constants";
import { StatusBadge } from "./status-badge";
import type { Nonprofit, OutreachStatus } from "./types";

interface EditableCellProps {
  value: any;
  row: {
    original: Nonprofit;
  };
  column: {
    id: string;
  };
  isEditing: boolean;
}

const baseInputStyles = `
  p-2 
  border 
  rounded 
  bg-gray-l5 
  border-gray-l2 
  focus:border-blue-l1 
  focus:ring-1 
  focus:ring-blue-l1
  w-full
`;

export const EditableCell = ({
  value,
  row,
  column,
  isEditing,
}: EditableCellProps) => {
  if (!isEditing) {
    if (column.id === "outreach_status") {
      return <StatusBadge status={value as OutreachStatus} />;
    }

    if (column.id === "migrate_to_hubspot") {
      return value ? "Yes" : "No";
    }

    if (["assets", "income", "revenue"].includes(column.id) && value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }

    return value || "-";
  }

  // Editing mode inputs
  switch (column.id) {
    case "outreach_status":
      return (
        <select
          name="outreach_status"
          defaultValue={value}
          className={baseInputStyles}
        >
          {OUTREACH_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      );

    case "migrate_to_hubspot":
      return (
        <select
          name="migrate_to_hubspot"
          defaultValue={value ? "true" : "false"}
          className={baseInputStyles}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      );

    case "marketing_notes":
      return (
        <textarea
          name="marketing_notes"
          defaultValue={value || ""}
          className={baseInputStyles}
          rows={2}
        />
      );

    case "contact_email":
      return (
        <input
          type="email"
          name="contact_email"
          defaultValue={value || ""}
          className={baseInputStyles}
        />
      );

    default:
      return (
        <input
          type="text"
          name={column.id}
          defaultValue={value || ""}
          className={baseInputStyles}
        />
      );
  }
};
