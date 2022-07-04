import { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { EndowmentAdminParams } from "./types";
import { GuardPrompt } from "pages/Admin/Admin";
import Proposal from "pages/Admin/Proposals/Proposal";
import Proposals from "pages/Admin/Proposals/Proposals";
import { useEndowmentCWs } from "services/juno/account/queriers";
import { useMember } from "services/juno/admin/queriers";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import { setCWContracts } from "slices/admin/cwContracts";
import { adminRoutes } from "constants/routes";
import AdminNav from "./AdminNav";
import Dashboard from "./Dashboard/Dashboard";
import Proposer from "./Proposer";

export default function EndowmentAdmin() {
  const dispatch = useSetter();
  const { wallet } = useGetWallet();
  const { address: endowmentAddress } = useParams<EndowmentAdminParams>();
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
    //eslint-disable-next-line
  }, [isCWContractsLoading, dispatch]);

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
          <Route path={adminRoutes.proposals} element={<Proposals />} />
          <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
          <Route
            path={`${adminRoutes.proposal_types}/*`}
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
