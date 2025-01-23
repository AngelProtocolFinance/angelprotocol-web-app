import { env } from "constants/env";

/**
 *
 * @param v version number
 * @returns v{v} if not staging
 */
export const version = (v: number) => (env === "dev" ? "staging" : `v${v}`);

export const toSearch = (obj: Record<string, any>) => {
  const searchParams = new URLSearchParams();
  for (const key in obj) {
    if (obj[key] != null && obj[key] !== "") {
      searchParams.append(key, obj[key]);
    }
  }
  return searchParams;
};
