import { ap, ver } from "api/api";
import { getMedia } from "api/get/media";
import { plusInt } from "api/schema/endow-id";
import { loadAuth, redirectToAuth } from "auth";
import { parseWithValibot } from "conform-to-valibot";
import { adminRoutes } from "constants/routes";
import {
  type ActionFunction,
  type LoaderFunction,
  type RouteObject,
  redirect,
} from "react-router";
import { parse } from "valibot";
import Media from "./Media";
import { VideoEditor, schema } from "./VideoEditor";
import Videos from "./Videos";

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

  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const fv = await request.formData();
  const intent = fv.get("intent") as "feature" | "delete";
  const featured = fv.get("featured") === "1";
  const mediaId = fv.get("mediaId");

  const path = `${ver(1)}/endowments/${endowId}/media/${mediaId}`;
  const res =
    intent === "feature"
      ? await ap.patch(path, {
          headers: { authorization: auth.idToken },
          json: { featured: !featured },
        })
      : await ap.delete(path, {
          headers: { authorization: auth.idToken },
        });

  return { ok: res.ok };
};

const newAction: ActionFunction = async ({ params, request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const fv = await request.formData();
  const payload = parseWithValibot(fv, { schema });
  if (payload.status !== "success") return payload.reply();

  await ap.post(`${ver(1)}/endowments/${params.id}/media`, {
    headers: { authorization: auth.idToken },
    body: payload.value.url,
  });
  return redirect("..");
};

const editAction: ActionFunction = async ({ params, request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const fv = await request.formData();
  const payload = parseWithValibot(fv, { schema });
  if (payload.status !== "success") return payload.reply();

  await ap.patch(`${ver(1)}/endowments/${params.id}/media/${params.mediaId}`, {
    headers: { authorization: auth.idToken },
    json: { url: payload.value.url },
  });

  return redirect("..");
};

const promptPaths: RouteObject[] = [
  { path: "new", action: newAction, element: <VideoEditor /> },
  { path: ":mediaId", element: <VideoEditor />, action: editAction },
];

export const mediaRoutes: RouteObject[] = [
  {
    path: adminRoutes.media,
    element: <Media />,
    loader: featuredMedia,
    action: videosAction,
    children: promptPaths,
  },
  {
    path: adminRoutes.media + "/videos",
    element: <Videos />,
    loader: allVideos,
    action: videosAction,
    children: promptPaths,
  },
];
