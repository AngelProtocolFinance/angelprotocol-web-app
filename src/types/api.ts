export type URLFunc = (
  url: URL,
  prepend: (x: string) => string
) => URL | string;
export type InitFunc = (h: Headers) => RequestInit;
export type Fetcher = (
  url_fn: URLFunc,
  init_fn?: InitFunc
) => Promise<Response>;

export interface ITokenMin {
  min: number;
  /** usd/unit */
  rate: number;
}
