import { Route, Routes } from "react-router-dom";
import { LinkGroup } from "../Sidebar/types";
import { adminRoutes } from "constants/routes";
import Layout from "../Layout";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import { LINKS } from "../constants";
import Account from "./Account";
import Contributions from "./Contributions";
import Dashboard from "./Dashboard";
import EditProfile from "./EditProfile";
import Invest from "./Invest";
import Settings from "./Settings";
import Templates from "./Templates";
import WidgetConfigurer from "./WidgetConfigurer";
import Withdraws from "./Withdraws";

const LINK_GROUPS: LinkGroup[] = [
  {
    links: [LINKS.index, LINKS.withdraws, LINKS.contributions],
  },
  {
    title: "Invest",
    links: [
      LINKS.invest,
      LINKS.liquidAccount,
      LINKS.lockedAccount,
      LINKS.settings,
    ],
  },
  { title: "Profile", links: [LINKS.edit_profile] },
  {
    title: "Manage",
    links: [LINKS[adminRoutes.proposals]],
  },
];

export default function Charity() {
  return (
    <Routes>
      <Route element={<Layout linkGroups={LINK_GROUPS} />}>
        <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
        <Route path={adminRoutes.proposals} element={<Proposals />} />
        <Route path={`${adminRoutes.templates}/*`} element={<Templates />} />
        <Route path={adminRoutes.withdraws} element={<Withdraws />} />
        <Route path={adminRoutes.account}>
          <Route path="liquid" element={<Account type="liquid" />} />
          <Route path="locked" element={<Account type="locked" />} />
        </Route>
        <Route path={adminRoutes.invest} element={<Invest />} />
        <Route path={adminRoutes.contributions} element={<Contributions />} />
        <Route path={adminRoutes.settings} element={<Settings />} />
        <Route path={adminRoutes.edit_profile} element={<EditProfile />} />
        <Route path={adminRoutes.widget_config}>
          <Route index element={<WidgetConfigurer />} />
          <Route path=":endowId" element={<WidgetConfigurer />} />
        </Route>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
