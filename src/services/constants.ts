import { IS_TEST } from "constants/env";
import { APIEnvironment } from "types/lists";

export const apiEnv: APIEnvironment = IS_TEST ? "staging" : "production";
