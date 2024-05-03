import { IS_TEST } from "constants/env";
import type { APIEnvironment } from "types/lists";

export const apiEnv: APIEnvironment = IS_TEST ? "staging" : "production";
