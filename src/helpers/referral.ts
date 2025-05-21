import { customAlphabet } from "nanoid";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const referral_id = (prefix?: "NPO") => {
  const id = customAlphabet(ALPHABET, 8)();
  return `${prefix ? `${prefix}-` : ""}${id.slice(0, 4)}-${id.slice(4)}`;
};
