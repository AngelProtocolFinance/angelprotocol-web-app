import type { EndowUpdate } from "@better-giving/endowment";
import {
  endowIdParam,
  endowUpdate as endowUpdateSchema,
} from "@better-giving/endowment/schema";
import { type ActionFunction, redirect } from "@vercel/remix";
import type { ActionData } from "types/action";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { editNpo, getNpo } from ".server/npo";

type Next = { success: string } | { redirect: string };

export const endowUpdate =
  (next: Next): ActionFunction =>
  async ({ params, request }) => {
    const { user, headers } = await cognito.retrieve(request);
    if (!user) return toAuth(request, headers);
    const id = parse(endowIdParam, params.id);

    const update: EndowUpdate = await request.json();
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

    await editNpo(id, parsed);

    if ("success" in next) {
      return { __ok: next.success } satisfies ActionData;
    }

    return redirect(next.redirect);
  };
