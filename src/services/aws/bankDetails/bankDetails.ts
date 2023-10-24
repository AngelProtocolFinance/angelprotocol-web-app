import { WiseRequest } from "types/aws";
import { aws } from "services/aws/aws";
import { version as v } from "../../helpers";

export const bank_details_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * The endpoint returns different types of results depending on the requests sent, but since it's impossible
     * to specify a generic return argument here, we return `unknown` and cast the return value manually
     */
    wise: builder.mutation<unknown, WiseRequest>({
      query: (payload) => ({
        url: `/${v(1)}/wise`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});
