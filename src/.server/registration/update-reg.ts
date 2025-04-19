import type { DbRecord } from "@better-giving/registration/db";
import { isIrs501c3 } from "@better-giving/registration/models";
import { type BankWithDetails, isDone } from "@better-giving/registration/step";
import type { Update } from "@better-giving/registration/update";
import { Wise } from "@better-giving/wise";
import { getReg } from "./get-reg.js";
import { getUsEndow, putItem } from "./helpers";
import { wiseApiToken } from ".server/env";

export async function updateRegistration(
  regId: string,
  update: Update,
  /** lowercase */
  updator: string,
  isBg: boolean
): Promise<[number, string] | DbRecord> {
  const prev = await getReg(regId);

  if (!prev) return [404, `reg:${regId} not found`];

  if (updator !== prev.registrant_id.toLowerCase() && !isBg) {
    return [401, "unauthorized"];
  }

  const updatedAt = new Date().toISOString();

  if (update.type === "contact") {
    const { type, ...next } = update;

    if (isDone.docs(prev)) {
      /// changing contact details will invalidate fsa docs if existing
      const { docs, ...p } = prev;

      const fsaSignerChanged =
        next.org_name !== p.contact.org_name ||
        next.org_role !== p.contact.org_role ||
        next.first_name !== p.contact.first_name ||
        next.last_name !== p.contact.last_name;

      if (fsaSignerChanged && !p.irs501c3) {
        // dont include doc in the override - effectively removing it
        return putItem({
          ...p,
          contact: next,
          update_type: "contact",
          updated_at: updatedAt,
          /** updating registration would revert back to status "inactive"
           *  scenario:
           *  - user submitted
           *  - application rejected and appears on /applications
           *  - user updates contact details, invalidating docs
           *  - normal: /applications/{uuid} expects complete reg and crashes
           *  - edge case: user could also go to /applications/{uuid} manually with incomplete registration, but there's no need to handle this case
           */
          status: "01",
        });
      }
    }

    return putItem({
      ...prev,
      contact: next,
      update_type: "contact",
      updated_at: updatedAt,
      status: "01",
    });
  }

  if (update.type === "org" && isDone.contact(prev)) {
    const { type, ...next } = update;

    if (!isDone.docs(prev) || !isDone.fsaInq(prev)) {
      return putItem({
        ...prev,
        org: update,
        update_type: "org",
        updated_at: updatedAt,
        status: "01",
      });
    }

    // changing org details will invalidate fsa docs if existing
    const { docs, irs501c3, ...p } = prev;

    const countryChanged = next.hq_country !== p.org.hq_country;
    if (countryChanged && !irs501c3) {
      // dont include doc in the override - effectively removing it
      // also remove fsa-inq so user would answer fsa-inq again based on new country
      return putItem({
        ...p,
        org: next,
        update_type: "org",
        updated_at: updatedAt,
        status: "01",
      });
    }

    return putItem({
      ...prev,
      org: next,
      update_type: "org",
      updated_at: updatedAt,
      status: "01",
    });
  }

  if (update.type === "fsa-inq" && isDone.org(prev)) {
    const { type, ...next } = update;

    if (isDone.docs(prev)) {
      // changing fsa-inq answer will invalidate docs
      const { docs, ...p } = prev;

      if (next.irs501c3 !== p.irs501c3) {
        return putItem({
          ...p,
          irs501c3: next.irs501c3,
          update_type: "fsa-inq",
          updated_at: updatedAt,
          status: "01",
        });
      }
    }

    return putItem({
      ...prev,
      irs501c3: next.irs501c3,
      update_type: "fsa-inq",
      updated_at: updatedAt,
      status: "01",
    });
  }

  if (update.type === "docs" && isDone.fsaInq(prev) && prev.irs501c3) {
    const { type, ...val } = update;
    const endow = await getUsEndow(val.ein, prev.env);

    if (endow && (endow.claimed ?? true)) {
      return [400, `ein:${val.ein} already claimed`];
    }

    return putItem({
      ...prev,
      docs: {
        ein: val.ein,
        claim: endow
          ? { id: endow.id, ein: endow.registration_number, name: endow.name }
          : undefined,
      },
      update_type: "docs",
      updated_at: updatedAt,
      status: "01",
    });
  }

  if (
    update.type === "banking" &&
    isDone.docs(prev) &&
    (isIrs501c3(prev.docs)
      ? true
      : !!prev.docs.fsa_signed_doc_url && !!prev.docs.fsa_signing_url)
  ) {
    const { type, ...val } = update;
    const wise = new Wise({
      apiToken: wiseApiToken,
      sandbox: prev.env === "staging",
    });
    const account = await wise.v2Account(val.wise_recipient_id);

    const banking: BankWithDetails = {
      ...val,
      accountSummary: account.longAccountSummary,
      fields: account.displayFields.map(({ key, ...f }) => f),
      accountName: account.name.fullName,
      details: account.details,
    };

    return putItem({
      ...prev,
      banking,
      update_type: "banking",
      updated_at: updatedAt,
      status: "01",
    });
  }

  return [400, "invalid update type"];
}
