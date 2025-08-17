import { media_ksuid } from "@better-giving/endowment/schema";
import { $int_gte1 } from "@better-giving/schemas";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import { ap, ver } from "api/api";
import { parseWithValibot } from "conform-to-valibot";
import { parse } from "valibot";
import { schema } from "./video-editor";
import { npodb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export const featuredMedia: LoaderFunction = async ({ params }) => {
  const endowId = parse($int_gte1, params.id);
  return npodb.npo_media(endowId, { featured: true, type: "video", limit: 3 });
};
export const allVideos: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const next = url.searchParams.get("nextPageKey") ?? undefined;
  const endowId = parse($int_gte1, params.id);
  const page = await npodb.npo_media(endowId, {
    type: "video",
    limit: 1,
    next,
  });
  return page;
};

export const videosAction: LoaderFunction = async (x) => {
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

export const newAction: ActionFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;
  const fv = await adm.req.formData();
  const payload = parseWithValibot(fv, { schema });
  if (payload.status !== "success") return payload.reply();

  await ap.post(`${ver(1)}/endowments/${adm.id}/media`, {
    headers: { authorization: adm.idToken },
    body: payload.value.url,
  });
  return redirect("..");
};

export const editAction: ActionFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;
  const fv = await adm.req.formData();
  const payload = parseWithValibot(fv, { schema });
  if (payload.status !== "success") return payload.reply();

  await ap.patch(`${ver(1)}/endowments/${adm.id}/media/${adm.params.mediaId}`, {
    headers: { authorization: adm.idToken },
    json: { url: payload.value.url },
  });

  return redirect("..");
};
