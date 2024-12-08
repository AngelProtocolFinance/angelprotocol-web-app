import type { MediaPage, MediaQueryParamsObj } from "@better-giving/endowment";
import { ap, toSearch, ver } from "api/api";
import { plusInt } from "api/schema/endow-id";
import { adminRoutes } from "constants/routes";
import type { LoaderFunction, RouteObject } from "react-router-dom";
import { parse } from "valibot";
import Media from "./Media";
import Videos from "./Videos";

const getMedia = async (endowId: number, params: MediaQueryParamsObj) => {
  return ap
    .get<MediaPage>(`${ver(1)}/endowments/${endowId}/media`, {
      searchParams: toSearch(params),
    })
    .json();
};

export const loader: LoaderFunction = async ({ params }) => {
  const endowId = parse(plusInt, params.id);
  return getMedia(endowId, { featured: true, type: "video", limit: 3 });
};

export const mediaRoutes: RouteObject[] = [
  { path: adminRoutes.media, element: <Media />, loader },
  { path: adminRoutes.media + "/videos", element: <Videos /> },
];
