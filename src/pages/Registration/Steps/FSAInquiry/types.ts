import type { OverrideProperties } from "type-fest";
import type { RegV2 } from "types/aws";

export type FV = OverrideProperties<RegV2.FsaInq, { irs501c3: "yes" | "no" }>;
