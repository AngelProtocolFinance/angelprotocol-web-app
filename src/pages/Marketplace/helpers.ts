import {
  type EndowQParams,
  type ParsedEndowQParams,
  endowQParams,
} from "types/aws";
import * as v from "valibot";

export const toRaw = (p: ParsedEndowQParams): URLSearchParams => {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(toObj(p))) {
    if (v) params.set(k, v);
  }
  return params;
};

export const toObj = (p: ParsedEndowQParams): EndowQParams => {
  const raw: EndowQParams = {
    query: p.query,
    page: p.page?.toString() ?? "1",
    sdgs: p.sdgs?.join(","),
    kyc_only: p.kyc_only?.join(","),
    countries: p.countries?.join(","),
    endow_designation: p.endow_designation?.join(),
    claimed: p.claimed?.join(","),
  };
  return raw;
};

export const toParsed = (raw: URLSearchParams): ParsedEndowQParams => {
  const obj: any = {};
  for (const [k, v] of raw.entries()) {
    obj[k] = v;
  }
  return v.parse(endowQParams, obj);
};
