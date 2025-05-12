import {
  HUBSPOT_NEWSLETTER_FORM_ID as formId,
  HUBSPOT_NEWSLETTER_PORTAL_ID as portalId,
  HUBSPOT_ACCESS_TOKEN as token,
} from "constants/env";
import { hsNewsletterSubs } from "../api";

export async function newsletterSubscribe(email: string) {
  return hsNewsletterSubs.post(`${portalId}/${formId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    json: { fields: [{ name: "email", value: email }] },
  });
}
