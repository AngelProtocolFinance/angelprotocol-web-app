import { Route, Routes } from "react-router-dom";
import { adminRoutes } from "constants/routes";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import Accounts from "./Accounts";
import Investments from "./Investments";
import Templates from "./Templates";
import Transactions from "./Transactions";
import { routes } from "./routes";

export default function Views() {
  return (
    <Routes>
      <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
      <Route path={adminRoutes.proposals} element={<Proposals />} />
      <Route path={`${adminRoutes.templates}/*`} element={<Templates />} />
      <Route path={routes.transactions} element={<Transactions />} />
      <Route path={`${routes.investments}/:type`} element={<Investments />} />
      <Route index element={<Accounts />} />
    </Routes>
  );
}
