export const tags = ["withdraw_logs", "donations", "tokens"] as const;

export type ApesTag = (typeof tags)[number];
