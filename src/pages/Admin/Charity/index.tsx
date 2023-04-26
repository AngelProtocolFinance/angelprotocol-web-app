import { Route, Routes } from "react-router-dom";
import { LinkGroup } from "../Sidebar/types";
import { EndowmentType } from "types/contracts";
import { adminRoutes } from "constants/routes";
import { useAdminResources } from "../Guard";
import Layout from "../Layout";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import { LINKS } from "../constants";
import Account from "./Account";
import Contributions from "./Contributions";
import ContributorVerification from "./ContributorVerification";
import Dashboard from "./Dashboard";
import EditProfile from "./EditProfile";
import Invest from "./Invest";
import Permissions from "./Permissions";
// import Settings from "./Settings";
import Templates from "./Templates";
import WidgetConfigurer from "./WidgetConfigurer";
import Withdraws from "./Withdraws";

const COMMON: LinkGroup[] = [
  {
    links: [LINKS.index, LINKS.withdraws, LINKS.contributions],
  },
  {
    title: "Invest",
    links: [
      LINKS.invest,
      LINKS.liquidAccount,
      LINKS.lockedAccount,
      // LINKS.settings,
    ],
  },
  { title: "Profile", links: [LINKS.edit_profile] },
  {
    title: "Manage",
    links: [LINKS[adminRoutes.proposals]],
  },
];

const LINK_GROUPS: { [key in EndowmentType]: LinkGroup[] } = {
  charity: [
    ...COMMON,
    { title: "Settings", links: [LINKS[adminRoutes.permissions]] },
  ],
  normal: [
    ...COMMON,
    {
      title: "Settings",
      links: [LINKS.contributor_verification, LINKS[adminRoutes.permissions]],
    },
  ],
};

export default function Charity() {
  const { endow_type } = useAdminResources<"charity">();

  return (
    <Routes>
      <Route element={<Layout linkGroups={LINK_GROUPS[endow_type]} />}>
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
        {/*<Route path={adminRoutes.settings} element={<Settings />} />*/}
        <Route path={adminRoutes.edit_profile} element={<EditProfile />} />
        <Route path={adminRoutes.permissions} element={<Permissions />} />
        <Route
          path={adminRoutes.contributor_verification}
          element={<ContributorVerification />}
        />
        <Route path={adminRoutes.widget_config}>
          <Route index element={<WidgetConfigurer />} />
          <Route path=":endowId" element={<WidgetConfigurer />} />
        </Route>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
