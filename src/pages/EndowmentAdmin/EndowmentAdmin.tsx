import { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { GuardPrompt } from "pages/Admin/Admin";
import Proposal from "pages/Admin/Proposals/Proposal";
import Proposals from "pages/Admin/Proposals/Proposals";
import { setCWContracts } from "services/admin/cwContracts";
import { useEndowmentCWs } from "services/terra/account/queriers";
import { useMember } from "services/terra/admin/queriers";
import { useSetter } from "store/accessors";
import useWalletContext from "hooks/useWalletContext";
import { admin } from "constants/routes";
import Dashboard from "./Dashboard/Dashboard";
import Proposer from "./Proposer";
import { EndowmentAddrParams } from "./types";

export default function EndowmentAdmin() {
  const dispatch = useSetter();
  const { wallet } = useWalletContext();
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
        {/* <AdminNav /> */}
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
