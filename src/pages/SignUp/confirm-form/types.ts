import type { ActionData as AD } from "types/action";
export { isActionErr, isValiErr, isData } from "types/action";

export type ActionData = AD<{ time_remaining: 30 }>;
