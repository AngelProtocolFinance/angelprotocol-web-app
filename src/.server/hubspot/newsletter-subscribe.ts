import { hsNewsletterSubs } from "api/api";
import { hubspotEnvs } from ".server/env";

const FORM_ID = "6593339e-cc5d-4375-bd06-560a8c88879c";
const PORTAL_ID = "24900163";

export async function newsletterSubscribe(email: string) {
  return hsNewsletterSubs.post(`${PORTAL_ID}/${FORM_ID}`, {
    headers: {
      Authorization: `Bearer ${hubspotEnvs.accessToken}`,
      "Content-Type": "application/json",
    },
    json: { fields: [{ name: "email", value: email }] },
  });
}
