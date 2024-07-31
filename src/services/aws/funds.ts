import { TEMP_JWT } from "constants/auth";
import type { Fund } from "types/aws";
import { version as v } from "../helpers";
import { aws } from "./aws";

export const funds = aws.injectEndpoints({
  endpoints: (builder) => ({
    createFund: builder.mutation<{ id: string }, Fund.New>({
      invalidatesTags: ["funds"],
      query: (payload) => {
        return {
          url: `${v(1)}/funds`,
          method: "POST",
          body: payload,
          headers: { authorization: TEMP_JWT },
        };
      },
    }),
  }),
});

export const { useCreateFundMutation } = funds;
