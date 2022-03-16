import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { govern } from "constants/routes";
import Landing from "./Landing";

const Details = lazy(() => import("./Details"));

export default function Governance() {
  return (
    <Routes>
      <Route path={`${govern.index}`} element={<Landing />} />
      <Route path={`${govern.poll}/:id`} element={<Details />} />
    </Routes>
  );
}
