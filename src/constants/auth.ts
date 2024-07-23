import type { CognitoGroup } from "types/auth";

export const TEMP_JWT = "__JWT__";

export const groups: { [G in CognitoGroup]: G } = {
  "ap-admin": "ap-admin",
};
