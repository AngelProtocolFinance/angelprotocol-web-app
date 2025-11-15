import { ngrok_base_url } from ".server/env";

class Resp {
  json(x: object, status = 200) {
    return new Response(JSON.stringify(x), {
      status,
      headers: { "content-type": "application/json" },
    });
  }
  status(status: number, text?: string): Response {
    return new Response(text, { status, statusText: text });
  }
  txt(x: string, status = 200): Response {
    return new Response(x, {
      status,
      headers: { "content-type": "text/plain" },
    });
  }
  err(status: number, x: string): Response {
    return this.txt(x, status);
  }
}

export const resp = new Resp();

type R = { [k: string]: string | undefined };

export function search<T extends { [k: string]: string }>(
  search: URLSearchParams
): T;
export function search<T extends R>(request: Request): T;
export function search<T extends R>(url: URL): T;
export function search<T extends R>(search: URLSearchParams): T;
export function search<T extends R>(url_str: string): T;
export function search<T extends R>(
  input: Request | URLSearchParams | URL | string
): T {
  let x: URLSearchParams;
  if (input instanceof URLSearchParams) {
    x = input;
  } else if (input instanceof Request) {
    x = new URL(input.url).searchParams;
  } else if (input instanceof URL) {
    x = input.searchParams;
  } else {
    x = new URL(input).searchParams;
  }
  return Object.fromEntries(x.entries()) as T;
}

export const sans_https = (x: string | undefined) =>
  x && x.replace(/^https:\/\//, "");

export const base_url = (url: string | URL | Request) => {
  let base = "";
  if (url instanceof Request) {
    base = new URL(url.url).origin;
  }
  if (url instanceof URL) {
    base = url.origin;
  }
  if (typeof url === "string") {
    const u = new URL(url);
    base = u.origin;
  }
  return ngrok_base_url || base;
};
