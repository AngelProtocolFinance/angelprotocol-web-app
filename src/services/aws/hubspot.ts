import { aws } from "./aws";

const ROOT_PATH = "v1/hubspot";

export const { useNewsletterSubscribeMutation } = aws.injectEndpoints({
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
