import type { FsaInq } from "@better-giving/registration/models";
import type { OverrideProperties } from "type-fest";

export type FV = OverrideProperties<FsaInq, { irs501c3: "yes" | "no" }>;
