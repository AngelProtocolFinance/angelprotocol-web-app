import { adminRoutes } from "constants/routes";
import type { RouteObject } from "react-router-dom";
import Media from "./Media";
import Videos from "./Videos";

export const mediaRoutes: RouteObject[] = [
  { path: adminRoutes.media, element: <Media /> },
  { path: adminRoutes.media + "/videos", element: <Videos /> },
];
