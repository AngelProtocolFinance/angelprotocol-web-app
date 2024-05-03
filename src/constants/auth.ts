import type { CognitoGroup } from "types/auth";

export const OAUTH_PATH_STORAGE_KEY = "OATH_ORIGIN";
export const TEMP_JWT = "__JWT__";

export const groups: { [G in CognitoGroup]: G } = {
  "ap-admin": "ap-admin",
};
