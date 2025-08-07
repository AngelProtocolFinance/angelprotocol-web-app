import { $int_gte1 } from "@better-giving/schemas";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import { ap, ver } from "api/api";
import { getMedia } from "api/get/media";
import { parseWithValibot } from "conform-to-valibot";
import { parse } from "valibot";
import { schema } from "./video-editor";
import { admin_checks, is_resp } from ".server/utils";

export const featuredMedia: LoaderFunction = async ({ params }) => {
  const endowId = parse($int_gte1, params.id);
  return getMedia(endowId, { featured: true, type: "video", limit: 3 });
};
export const allVideos: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const nextPageKey = url.searchParams.get("nextPageKey") ?? undefined;
  const endowId = parse($int_gte1, params.id);
  const res = await getMedia(endowId, {
    type: "video",
    limit: 10,
    nextPageKey: nextPageKey,
  });
  // TODO: convert to {items, next}
  return {
    items: res.items,
    next: res.nextPageKey,
  };
};

export const videosAction: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const fv = await adm.req.formData();
  const intent = fv.get("intent") as "feature" | "delete";
  const featured = fv.get("featured") === "1";
  const mediaId = fv.get("mediaId");

  const path = `${ver(1)}/endowments/${adm.id}/media/${mediaId}`;
  const res =
    intent === "feature"
      ? await ap.patch(path, {
          headers: { authorization: adm.idToken },
          json: { featured: !featured },
        })
      : await ap.delete(path, {
          headers: { authorization: adm.idToken },
        });

  return { ok: res.ok };
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
