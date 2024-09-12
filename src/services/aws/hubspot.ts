import { version as v } from "../helpers";
import { aws } from "./aws";

const ROOT_PATH = "v1/hubspot";

type HubspotContactPayload = {
  email: string;
  firstName: string;
  lastName: string;
  type: "donor" | "nonprofit";
};

export const { useNewsletterSubscribeMutation, useSaveSignupMutation } =
  aws.injectEndpoints({
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
      saveSignup: builder.mutation<unknown, HubspotContactPayload>({
        query: (data) => {
          return {
            url: `${v(1)}/hubspot/contacts`,
            method: "POST",
            body: data,
          };
        },
      }),
    }),
  });
