import { aws } from "./aws";

const ROOT_PATH = "v1/hubspot";

const newsletter_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    newsletterSubscribe: builder.mutation<unknown, string>({
      query: (email) => {
        return {
          url: `${ROOT_PATH}/email-subs`,
          method: "POST",
          body: { email },
        };
      },
    }),
  }),
});

export const { useNewsletterSubscribeMutation } = newsletter_api;
