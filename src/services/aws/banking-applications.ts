import { NewBankingApplication } from "types/aws";
import { aws } from "./aws";

const bankingApplications = aws.injectEndpoints({
  endpoints: (builder) => ({
    newBankingApplication: builder.query<unknown, NewBankingApplication>({
      query: (payload) => {
        return {
          method: "POST",
          url: "/staging/banking-applications",
          body: payload,
        };
      },
    }),
  }),
});

export const { useNewBankingApplicationQuery } = bankingApplications;
