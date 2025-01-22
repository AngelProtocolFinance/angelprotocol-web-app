import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import { ap, ver } from "api/api";
import { getMedia } from "api/get/media";
import { plusInt } from "api/schema/endow-id";
import { parseWithValibot } from "conform-to-valibot";
import { parse } from "valibot";
import { schema } from "./VideoEditor";
import { cognito, toAuth } from ".server/auth";

export const featuredMedia: LoaderFunction = async ({ params }) => {
  const endowId = parse(plusInt, params.id);
  return getMedia(endowId, { featured: true, type: "video", limit: 3 });
};
export const allVideos: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const nextPageKey = url.searchParams.get("nextPageKey") ?? undefined;
  const endowId = parse(plusInt, params.id);
  return getMedia(endowId, {
    type: "video",
    limit: 10,
    nextPageKey: nextPageKey,
  });
};

export const videosAction: LoaderFunction = async ({ params, request }) => {
  const endowId = parse(plusInt, params.id);

  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const fv = await request.formData();
  const intent = fv.get("intent") as "feature" | "delete";
  const featured = fv.get("featured") === "1";
  const mediaId = fv.get("mediaId");

  const path = `${ver(1)}/endowments/${endowId}/media/${mediaId}`;
  const res =
    intent === "feature"
      ? await ap.patch(path, {
          headers: { authorization: user.idToken },
          json: { featured: !featured },
        })
      : await ap.delete(path, {
          headers: { authorization: user.idToken },
        });

  return { ok: res.ok };
};

export const newAction: ActionFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const fv = await request.formData();
  const payload = parseWithValibot(fv, { schema });
  if (payload.status !== "success") return payload.reply();

  await ap.post(`${ver(1)}/endowments/${params.id}/media`, {
    headers: { authorization: user.idToken },
    body: payload.value.url,
  });
  return redirect("..");
};

export const editAction: ActionFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const fv = await request.formData();
  const payload = parseWithValibot(fv, { schema });
  if (payload.status !== "success") return payload.reply();

  await ap.patch(`${ver(1)}/endowments/${params.id}/media/${params.mediaId}`, {
    headers: { authorization: user.idToken },
    json: { url: payload.value.url },
  });

  return redirect("..");
};
