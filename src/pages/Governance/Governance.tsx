import { Route, Routes } from "react-router-dom";
import { govern } from "constants/routes";
import Landing from "./Landing";
import PollDetails from "./PollDetails/PollDetails";

export default function Governance() {
  return (
    <Routes>
      <Route path={`${govern.index}`} element={<Landing />} />
      <Route path={`${govern.pollDetails}/:id`} element={<PollDetails />} />
    </Routes>
  );
}
