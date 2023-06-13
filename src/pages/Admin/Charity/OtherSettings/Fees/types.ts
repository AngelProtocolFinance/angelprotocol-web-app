import { Fees } from "types/ast";
import { FeeSettingsUpdate } from "types/contracts";

export type FV = Fees & { initial: FeeSettingsUpdate };
