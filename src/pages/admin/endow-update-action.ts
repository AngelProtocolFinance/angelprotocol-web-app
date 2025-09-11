import type { INpoUpdate } from "@better-giving/endowment";
import { npo_update } from "@better-giving/endowment/schema";
import { type ActionFunction, redirect } from "react-router";
import type { ActionData } from "types/action";
import { parse } from "valibot";
import { npodb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

type Next = { success: string } | { redirect: string };

export const endowUpdate =
  (next: Next): ActionFunction =>
  async (args) => {
    const adm = await admin_checks(args);
    if (is_resp(adm)) return adm;

    const update: INpoUpdate = await adm.req.json();
    const parsed = parse(npo_update, update);

    // check if new slug is already taken
    if (parsed.slug) {
      const res = await npodb.npo(parsed.slug);
      if (res) {
        return {
          __err: `Slug ${parsed.slug} is already taken`,
        };
      }
    }

    await npodb.npo_update(adm.id, parsed);

    if ("success" in next) {
      return { __ok: next.success } satisfies ActionData;
    }

    return redirect(next.redirect);
  };
