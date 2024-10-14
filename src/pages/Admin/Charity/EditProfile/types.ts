import type { InferInput } from "valibot";
import type { schema } from "./schema";

export type FV = InferInput<typeof schema>;
