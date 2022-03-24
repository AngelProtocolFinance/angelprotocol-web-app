import { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { useConnectedWallet } from "@terra-money/use-wallet";
import { useMember } from "services/terra/admin/queriers";
import { setCWContracts } from "services/admin/cwContracts";
import { useEndowmentCWs } from "services/terra/account/queriers";
import Proposals from "pages/Admin/Proposals/Proposals";
import Proposal from "pages/Admin/Proposals/Proposal";
import { GuardPrompt } from "pages/Admin/Admin";
import { admin } from "constants/routes";
import { useSetter } from "store/accessors";
import Dashboard from "./Dashboard/Dashboard";
import Proposer from "./Proposer";
import AdminNav from "./AdminNav";
import { EndowmentAddrParams } from "./types";

export default function EndowmentAdmin() {
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const { address: endowmentAddress } = useParams<EndowmentAddrParams>();
  const { cwContracts, isCWContractsLoading } =
    useEndowmentCWs(endowmentAddress);

  const { member, isMemberLoading } = useMember(
    cwContracts,
    isCWContractsLoading
  );

  //set admin context
  useEffect(() => {
    if (isCWContractsLoading) return;
    dispatch(setCWContracts(cwContracts));
  }, [cwContracts, isCWContractsLoading, dispatch]);

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
          <Route path={admin.proposals} element={<Proposals />} />
          <Route path={`${admin.proposal}/:id`} element={<Proposal />} />
          <Route path={`${admin.proposal_types}/*`} element={<Proposer />} />
          <Route
            index
            element={<Dashboard endowmentAddr={endowmentAddress!} />}
          />
        </Routes>
      </div>
    );
}
