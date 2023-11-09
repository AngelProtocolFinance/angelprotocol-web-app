type Key = keyof Documentation;
const _tier: Key = "tier";

export type FormValues = Omit<Documentation, typeof _tier>;
