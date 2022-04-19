import { Route, Routes } from "react-router-dom";
import { governRoutes } from "types/routes";
import Landing from "./Landing";
import PollDetails from "./PollDetails/PollDetails";

export default function Governance() {
  return (
    <Routes>
      <Route path={`${governRoutes.index}`} element={<Landing />} />
      <Route
        path={`${governRoutes.pollDetails}/:id`}
        element={<PollDetails />}
      />
    </Routes>
  );
}
