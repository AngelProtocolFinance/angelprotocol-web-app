import { Navigate, Route, Routes } from "react-router-dom";
import { LinkGroup } from "../Sidebar/types";
import { EndowmentType } from "types/lists";
import { adminRoutes } from "constants/routes";
import AdminWallet from "../AdminWallet";
import { useAdminContext } from "../Context";
import Layout from "../Layout";
import Proposal from "../Proposal";
import Proposals from "../Proposals";
import { LINKS } from "../constants";
import Account from "./Account";
import Contributions from "./Contributions";
import Dashboard from "./Dashboard";
import Deposits from "./Deposits";
import EditProfile from "./EditProfile";
import Invest from "./Invest";
import Maturity from "./Maturity";
import OtherSettings from "./OtherSettings";
import Permissions from "./Permissions";
// import Settings from "./Settings";
import Templates from "./Templates";
import Whitelists from "./Whitelists";
import WidgetConfigurer from "./WidgetConfigurer";
import Withdraws from "./Withdraws";

const COMMON: LinkGroup[] = [
  {
    links: [LINKS.index, LINKS.deposits, LINKS.withdraws, LINKS.contributions],
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
];

const LINK_GROUPS: { [key in EndowmentType]: LinkGroup[] } = {
  charity: [
    ...COMMON,
    {
      title: "Manage",
      links: [
        LINKS.whitelists,
        LINKS.permissions,
        LINKS.admin_wallet,
        LINKS.proposals,
      ],
    },
  ],
  normal: [
    ...COMMON,
    {
      title: "Manage",
      links: [
        LINKS.whitelists,
        LINKS.maturity,
        LINKS.permissions,
        LINKS.admin_wallet,
        LINKS.other_settings,
        LINKS.proposals,
      ],
    },
  ],
};

export default function Charity() {
  const { endowType } = useAdminContext<"charity">();

  return (
    <Routes>
      <Route element={<Layout linkGroups={LINK_GROUPS[endowType]} />}>
        <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
        <Route path={adminRoutes.proposals} element={<Proposals />} />
        <Route path={`${adminRoutes.templates}/*`} element={<Templates />} />
        <Route path={adminRoutes.deposits} element={<Deposits />} />
        <Route path={adminRoutes.withdraws} element={<Withdraws />} />
        <Route path={adminRoutes.account}>
          <Route path="liquid" element={<Account type="liquid" />} />
          <Route path="locked" element={<Account type="locked" />} />
        </Route>
        <Route path={adminRoutes.invest} element={<Invest />} />
        <Route path={adminRoutes.contributions} element={<Contributions />} />
        <Route path={adminRoutes.whitelists} element={<Whitelists />} />
        <Route path={adminRoutes.maturity} element={<Maturity />} />
        <Route path={adminRoutes.edit_profile} element={<EditProfile />} />
        <Route path={adminRoutes.permissions} element={<Permissions />} />
        <Route path={adminRoutes.other_settings} element={<OtherSettings />} />
        <Route path={adminRoutes.admin_wallet} element={<AdminWallet />} />
        <Route path={adminRoutes.widget_config}>
          <Route index element={<WidgetConfigurer />} />
          <Route path=":endowId" element={<WidgetConfigurer />} />
        </Route>
        <Route index element={<Dashboard />} />
        <Route path="*" element={<Navigate replace to={adminRoutes.index} />} />
      </Route>
    </Routes>
  );
}
