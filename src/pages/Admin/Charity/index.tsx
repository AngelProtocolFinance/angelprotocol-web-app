import { Navigate, Route, Routes } from "react-router-dom";
import { LinkGroup } from ".././types";
import { adminRoutes } from "constants/routes";
import { useAdminResources } from "../Guard";
import Layout from "../Layout";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import { LINKS } from "../constants";
import Dashboard from "./Dashboard";
import EditProfile from "./EditProfile";
import Invest from "./Invest";
import Settings from "./Settings";
import StrategyEditor from "./Settings/StrategyEditor";
import Templates from "./Templates";
import WidgetConfigurer from "./WidgetConfigurer";
import Withdraws from "./Withdraws";
import { settings } from "./routes";

export default function Charity() {
  const { id } = useAdminResources();

  return (
    <Routes>
      <Route element={<Layout linkGroups={createLinkGroups(id)} />}>
        <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
        <Route path={adminRoutes.proposals} element={<Proposals />} />
        <Route path={`${adminRoutes.templates}/*`} element={<Templates />} />
        <Route path={adminRoutes.withdraws} element={<Withdraws />} />
        <Route path={adminRoutes.invest} element={<Invest />} />
        <Route path={adminRoutes.settings}>
          <Route
            path={`${settings.edit}/liquid`}
            element={<StrategyEditor type="liquid" />}
          />
          <Route
            path={`${settings.edit}/locked`}
            element={<StrategyEditor type="locked" />}
          />
          <Route index element={<Settings />} />
          <Route path="*" element={<Navigate to="." />} />
        </Route>
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

function createLinkGroups(endowId: number): LinkGroup[] {
  return [
    {
      links: [
        LINKS[adminRoutes.index],
        LINKS[adminRoutes.withdraws],
        LINKS[adminRoutes.contributions],
      ],
    },
    {
      title: "Invest",
      links: [LINKS[adminRoutes.invest], LINKS[adminRoutes.settings]],
    },
    { title: "Profile", links: [LINKS[adminRoutes.edit_profile]] },
    {
      title: "Manage",
      links: [
        LINKS[adminRoutes.proposals],
        {
          ...LINKS[adminRoutes.widget_config],
          to: `${LINKS[adminRoutes.widget_config].to}/${endowId}`,
        },
      ],
    },
  ];
}
