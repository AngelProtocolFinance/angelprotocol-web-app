export const str_id = (raw: { id: string } | string | null) => {
  if (!raw) throw `invalid payment method ID: ${raw}`;
  if (typeof raw === "string") return raw;
  return raw.id;
};
