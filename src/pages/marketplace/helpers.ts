import type {
  EndowsQueryParams,
  EndowsQueryParamsParsed,
} from "@better-giving/endowment";
import { endowsQueryParams } from "@better-giving/endowment/cloudsearch";
import * as v from "valibot";

export const toRaw = (p: EndowsQueryParamsParsed): URLSearchParams => {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(toFlat(p))) {
    if (v) params.set(k, v as any);
  }
  return params;
};

export const toFlat = (p: EndowsQueryParamsParsed): EndowsQueryParams => {
  const raw: EndowsQueryParams = {
    page: p.page?.toString(),
    query: p.query,
    sdgs: p.sdgs?.join(","),
    kyc_only: p.kyc_only?.join(","),
    countries: p.countries?.join(","),
    endow_designation: p.endow_designation?.join(),
    claimed: p.claimed?.join(","),
  };
  return raw;
};

export const toParsed = (raw: URLSearchParams): EndowsQueryParamsParsed => {
  const obj: any = {};
  for (const [k, v] of raw.entries()) {
    obj[k] = v;
  }
  return v.parse(endowsQueryParams, obj);
};
