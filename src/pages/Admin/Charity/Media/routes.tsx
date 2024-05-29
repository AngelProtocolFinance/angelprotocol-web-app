import { Route, Routes as RouterRoutes } from "react-router-dom";
import Media from "./Media";
import Videos from "./Videos";

export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="videos" element={<Videos />} />
      <Route index element={<Media />} />
    </RouterRoutes>
  );
}
