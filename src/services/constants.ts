import { APIEnvironment } from "types/lists";
import { IS_TEST } from "constants/env";

export const apiEnv: APIEnvironment = IS_TEST ? "staging" : "production";
