import { media_ksuid } from "@better-giving/endowment/schema";
import { $int_gte1 } from "@better-giving/schemas";
import { valibotResolver } from "@hookform/resolvers/valibot";
// import { parseWithValibot } from "conform-to-valibot";
import { search } from "helpers/https";
import {
  type ActionFunction,
  type LoaderFunctionArgs,
  redirect,
} from "react-router";
import { getValidatedFormData } from "remix-hook-form";
import { parse } from "valibot";
import { type ISchema, schema } from "./schema";
import { npodb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export const featured_media = async ({ params }: LoaderFunctionArgs) => {
  const endowId = parse($int_gte1, params.id);
  return npodb.npo_media(endowId, { featured: true, type: "video", limit: 3 });
};
export const all_videos = async ({ request, params }: LoaderFunctionArgs) => {
  const { nextPageKey: next } = search(request);
  const endowId = parse($int_gte1, params.id);
  const page = await npodb.npo_media(endowId, {
    type: "video",
    limit: 5,
    next,
  });
  return page;
};

export const videos_action: ActionFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const fv = await adm.req.formData();
  const intent = fv.get("intent") as "feature" | "delete";
  const featured = fv.get("featured") === "1";
  const mid = parse(media_ksuid, fv.get("mediaId"));

  const prev = await npodb.npo_med(adm.id, mid);
  if (!prev) return { status: 404 };

  if (intent === "feature") {
    await npodb.npo_med_update(adm.id, prev, {
      featured: !featured,
    });
    return { ok: true };
  }

  await npodb.npo_med_delete(adm.id, prev.id);
  return { ok: true };
};

export const new_action: ActionFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const fv = await getValidatedFormData<ISchema>(
    adm.req,
    valibotResolver(schema)
  );
  if (fv.errors) return fv;

  await npodb.npo_med_put(adm.id, fv.data.url);

  return redirect("..");
};

export const edit_action: ActionFunction = async (x) => {
  const mid = parse(media_ksuid, x.params.mediaId);
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const fv = await getValidatedFormData<ISchema>(
    adm.req,
    valibotResolver(schema)
  );
  if (fv.errors) return fv;

  const m = await npodb.npo_med(adm.id, mid);
  if (!m) return { status: 404 };

  await npodb.npo_med_update(adm.id, m, {
    url: fv.data.url,
  });

  return redirect("..");
};
