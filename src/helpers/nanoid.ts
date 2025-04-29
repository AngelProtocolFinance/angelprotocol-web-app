import { customAlphabet } from "nanoid";

// Define the alphabet and length
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const nanoidGenerator = (length: number) => customAlphabet(ALPHABET, length);

export function generateReferralId() {
  const nanoid = nanoidGenerator(8);
  const rawId = nanoid();
  return `${rawId.slice(0, 4)}-${rawId.slice(4)}`;
}
