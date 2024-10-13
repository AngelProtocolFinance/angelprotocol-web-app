import type { LoaderFunction, To } from "react-router-dom";

export const decodeState = <T>(base64: string | null) => {
  try {
    if (!base64) return null;
    return JSON.parse(atob(base64)) as T;
  } catch (_) {
    return null;
  }
};

/** includes state in search params */
export function toWithState(to: To, state: unknown): To {
  if (!state) return to;
  if (typeof state !== "object") return to;

  const encoded = btoa(JSON.stringify(state));
  if (typeof to === "string") return `${to}?_s=${encoded}`;
  const { pathname, search, hash } = to;

  if (!search) return { pathname, hash };

  const s = new URLSearchParams(search);
  if (s.size === 0) return { pathname, hash };

  s.append("_s", encoded);

  return { pathname, hash, search: s.toString() };
}

export function toUrlWithState(url: URL, state: unknown) {
  const copy = new URL(url);
  if (!state) return copy;
  if (typeof state !== "object") return url;

  const encoded = btoa(JSON.stringify(state));
  copy.searchParams.append("_s", encoded);
  return copy;
}

export const stateLoader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  return decodeState(url.searchParams.get("_s"));
};

export type AuthLoc = {
  pathname: string;
  state?: unknown;
};
export const authLocLoader: LoaderFunction = ({ request }): AuthLoc => {
  const url = new URL(request.url);
  return {
    pathname: url.pathname,
    state: decodeState(url.searchParams.get("_s")),
  };
};
