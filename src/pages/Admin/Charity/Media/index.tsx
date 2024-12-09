import type { MediaPage, MediaQueryParamsObj } from "@better-giving/endowment";
import { ap, toSearch, ver } from "api/api";
import { plusInt } from "api/schema/endow-id";
import { loadAuth, redirectToAuth } from "auth";
import { adminRoutes } from "constants/routes";
import type { LoaderFunction, RouteObject } from "react-router-dom";
import { parse } from "valibot";
import Media from "./Media";
import { VideoEditor } from "./VideoEditor";
import Videos from "./Videos";

const getMedia = async (endowId: number, params: MediaQueryParamsObj) => {
  return ap
    .get<MediaPage>(`${ver(1)}/endowments/${endowId}/media`, {
      searchParams: toSearch(params),
    })
    .json();
};

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
  return intent === "feature"
    ? await ap
        .patch(path, {
          headers: { authorization: auth.idToken },
          json: { featured: !featured },
        })
        .json()
    : await ap
        .delete(path, {
          headers: { authorization: auth.idToken },
        })
        .json();
};

export const mediaRoutes: RouteObject[] = [
  {
    path: adminRoutes.media,
    element: <Media />,
    loader: featuredMedia,
    children: [{ path: "new", element: <VideoEditor /> }],
  },
  {
    path: adminRoutes.media + "/videos",
    element: <Videos />,
    loader: allVideos,
    action: videosAction,
    children: [
      { path: "new", element: <VideoEditor /> },
      { path: ":mediaId", element: <VideoEditor /> },
    ],
  },
];
