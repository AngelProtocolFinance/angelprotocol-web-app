import type { EndowUpdate } from "@better-giving/endowment";
import { endowUpdate as endowUpdateSchema } from "@better-giving/endowment/schema";
import { type ActionFunction, redirect } from "@vercel/remix";
import type { ActionData } from "types/action";
import { parse } from "valibot";
import { admin_checks, is_resp } from "./utils";
import { editNpo, getNpo } from ".server/npo";

type Next = { success: string } | { redirect: string };

export const endowUpdate =
  (next: Next): ActionFunction =>
  async (args) => {
    const adm = await admin_checks(args);
    if (is_resp(adm)) return adm;

    const update: EndowUpdate = await adm.req.json();
    const parsed = parse(endowUpdateSchema, update);

    // check if new slug is already taken
    if (parsed.slug) {
      const res = await getNpo(parsed.slug);
      if (res) {
        return {
          __err: `Slug ${parsed.slug} is already taken`,
        };
      }
    }

    await editNpo(adm.id, parsed);

    if ("success" in next) {
      return { __ok: next.success } satisfies ActionData;
    }

    return redirect(next.redirect);
  };
