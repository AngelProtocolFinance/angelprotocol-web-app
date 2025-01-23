import type { EndowsPage } from "@better-giving/endowment";
import { ver } from "api/api";
import { APIs } from "constants/urls";
import { http, HttpResponse } from "msw";
import type { Crypto } from "types/aws";

export const handlers = [
  http.post(APIs.aws + "/v2/file/upload", () => {
    return HttpResponse.json();
  }),
  http.get("api/npos", () => {
    const data: EndowsPage = {
      items: [],
      numPages: 1,
      page: 1,
    };
    return HttpResponse.json(data);
  }),
  http.get(APIs.aws + `/${ver(1)}/crypto/v1/min-amount`, ({ request }) => {
    const url = new URL(request.url);
    const data: Required<Crypto.Estimate> = {
      min_amount: 1,
      currency_from: url.searchParams.get("currency_from")!,
      currency_to: "false",
      fiat_equivalent: 1,
    };
    return HttpResponse.json(data);
  }),

  http.options(APIs.aws, () => HttpResponse.json()),
];
