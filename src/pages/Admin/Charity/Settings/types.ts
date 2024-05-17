import type { EndowmentSettingsUpdate } from "types/aws";

export type FV = Omit<EndowmentSettingsUpdate, "id">;
