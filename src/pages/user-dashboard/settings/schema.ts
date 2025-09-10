import { int_gte1 } from "@better-giving/schemas";
import { alert_pref } from "@better-giving/user/schema";
import * as v from "valibot";

export const npo_alert_pref_update = v.object({
  npo: int_gte1,
  ...alert_pref.entries,
});

export const alert_prefs = v.pipe(
  v.array(npo_alert_pref_update),
  v.minLength(1)
);

export interface INpoAlertPrefUpdate
  extends v.InferOutput<typeof npo_alert_pref_update> {}
