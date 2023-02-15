import { Navigate, Route, Routes } from "react-router-dom";
import { LinkGroup } from "../Layout/types";
import { adminRoutes } from "constants/routes";
import Layout from "../Layout/Layout";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import Dashboard from "./Dashboard";
import EditProfile from "./EditProfile";
import Invest from "./Invest";
import Settings from "./Settings";
import StrategyEditor from "./Settings/StrategyEditor";
import Templates from "./Templates";
import WidgetConfigurer from "./WidgetConfigurer";
import Withdraws from "./Withdraws";

export default function Charity() {
  const {
    proposal,
    proposals,
    templates,
    withdraws,
    invest,
    settings,
    edit_profile,
    widget_config,
  } = adminRoutes;
  return (
    <Routes>
      <Route element={<Layout linkGroups={linkGroups} />}>
        <Route path={`${proposal.url}/:id`} element={<Proposal />} />
        <Route path={proposals.url} element={<Proposals />} />
        <Route path={`${templates.url}/*`} element={<Templates />} />
        <Route path={withdraws.url} element={<Withdraws />} />
        <Route path={invest.url} element={<Invest />} />
        <Route path={settings.url}>
          <Route
            path="edit/liquid"
            element={<StrategyEditor type="liquid" />}
          />
          <Route
            path="edit/locked"
            element={<StrategyEditor type="locked" />}
          />
          <Route index element={<Settings />} />
          <Route path="*" element={<Navigate to="." />} />
        </Route>
        <Route path={edit_profile.url} element={<EditProfile />} />
        <Route path={widget_config.url}>
          <Route index element={<WidgetConfigurer />} />
          <Route path=":endowId" element={<WidgetConfigurer />} />
        </Route>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

const linkGroups: LinkGroup[] = [
  {
    links: ["index", "withdraws"],
  },
  {
    title: "Invest",
    links: ["invest", "settings"],
  },
  { title: "Profile", links: ["edit_profile"] },
  { title: "Manage", links: ["proposals"] },
];
