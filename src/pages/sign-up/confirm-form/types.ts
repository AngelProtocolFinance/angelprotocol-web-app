import type { ActionData as AD } from "types/action";
export { is_err, is_form_err, is_data } from "types/action";

export type ActionData = AD<{ time_remaining: 30 }>;
