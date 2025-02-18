// constants.ts
export const ITEMS_PER_PAGE = 20;

export const STATUS_STYLES = {
  pending: {
    bg: "bg-amber-l4",
    text: "text-amber-d4",
  },
  contacted: {
    bg: "bg-blue-l4",
    text: "text-blue-d4",
  },
  responded: {
    bg: "bg-green-l4",
    text: "text-green-d4",
  },
  completed: {
    bg: "bg-gray-l4",
    text: "text-gray-d4",
  },
  declined: {
    bg: "bg-red-l4",
    text: "text-red-d4",
  },
};

export const OUTREACH_STATUSES = [
  "pending",
  "contacted",
  "responded",
  "completed",
  "declined",
] as const;

export const TABLE_COLUMNS = [
  "name",
  "ein",
  "assets",
  "income",
  "contact_name",
  "contact_email",
  "outreach_status",
  "migrate_to_hubspot",
  "marketing_notes",
] as const;
