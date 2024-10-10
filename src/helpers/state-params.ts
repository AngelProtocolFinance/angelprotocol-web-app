import type { LoaderFunction } from "react-router-dom";

export const toState = (state: object | undefined): string => {
  if (!state) return "";
  return btoa(JSON.stringify(state));
};

export const fromState = <T>(base64: string | null) => {
  try {
    if (!base64) return null;
    return JSON.parse(atob(base64)) as T;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const stateLoader: LoaderFunction = ({ request }) => {
  console.log({ request });
  const url = new URL(request.url);
  return fromState(url.searchParams.get("_s"));
};

export type AuthLoc = {
  pathname: string;
  state?: unknown;
};
export const authLocLoader: LoaderFunction = ({ request }): AuthLoc => {
  const url = new URL(request.url);
  return {
    pathname: url.pathname,
    state: fromState(url.searchParams.get("_s")),
  };
};
