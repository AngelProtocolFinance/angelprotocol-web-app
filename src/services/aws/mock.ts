import { APIs } from "constants/urls";
import { http, HttpResponse } from "msw";
import type {
  Crypto,
  EndowListPaginatedAWSQueryRes,
  EndowmentCard,
} from "types/aws";
import { version as v } from "../helpers";

export const handlers = [
  http.post(APIs.aws + "/v2/file/upload", () => {
    return HttpResponse.json();
  }),
  http.get(APIs.aws + `/${v(1)}/cloudsearch-nonprofits`, () => {
    const data: EndowListPaginatedAWSQueryRes<EndowmentCard[]> = {
      Items: [],
      NumOfPages: 1,
      Page: 1,
    };
    return HttpResponse.json(data);
  }),
  http.get(APIs.aws + `/${v(1)}/crypto/v1/min-amount`, ({ request }) => {
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
