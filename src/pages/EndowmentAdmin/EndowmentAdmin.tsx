import { Route, Routes, useParams } from "react-router-dom";
import { useConnectedWallet } from "@terra-money/use-wallet";
import { useMember } from "services/terra/admin/queriers";
import { endowmentAdmin } from "constants/routes";
import AdminNav from "./AdminNav";
import { GuardPrompt } from "pages/Admin/Admin";
import Dashboard from "./Dashboard/Dashboard";
import { EndowmentAddrParams } from "./types";
import { useEndowmentCWs } from "services/terra/account/queriers";
import Proposals from "pages/Admin/Proposals/Proposals";
import Proposer from "./Proposer";

export default function EndowmentAdmin() {
  const wallet = useConnectedWallet();
  const { address: endowmentAddress } = useParams<EndowmentAddrParams>();
  const { cwContracts, isCWContractsLoading } = useEndowmentCWs(
    endowmentAddress || ""
  );
  const { member, isMemberLoading } = useMember(
    cwContracts,
    isCWContractsLoading
  );

  if (!wallet) {
    return <GuardPrompt message="Your wallet is not connected" />;
  } else if (isMemberLoading || isCWContractsLoading) {
    return <GuardPrompt message="Checking wallet credential" showLoader />;
  } else if (!member.weight) {
    return <GuardPrompt message="You are not authorized to view this page" />;
  } else
    return (
      <div className="padded-container min-h-screen grid grid-rows-a1 pb-4 gap-2">
        <AdminNav />
        <Routes>
          <Route
            path={endowmentAdmin.proposals}
            element={
              <Proposals
                cws={cwContracts}
                templatesLink={endowmentAdmin.proposal_types}
              />
            }
          />
          <Route path={`${endowmentAdmin.proposal}/:id`} element={<div />} />
          <Route
            path={`${endowmentAdmin.proposal_types}/*`}
            element={<Proposer />}
          />
          <Route
            index
            element={<Dashboard endowmentAddr={endowmentAddress!} />}
          />
        </Routes>
      </div>
    );
}
