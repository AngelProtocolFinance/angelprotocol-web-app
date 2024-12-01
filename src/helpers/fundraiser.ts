import { formatDistance } from "date-fns";

const MAX_DATE = "9999-12-31T23:59:59Z";

export const expires = (input: string): [boolean, string | undefined] => {
  if (input === MAX_DATE) return [false, undefined];
  const now = new Date();
  if (now.toISOString() > input) return [true, undefined];

  return [false, `ends in ${formatDistance(new Date(input), now)}`];
};
