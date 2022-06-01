import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useMember } from "services/terra/admin/queriers";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import Loader from "components/Loader";
import { useSetter } from "store/accessors";
import { setCWContracts } from "slices/admin/cwContracts";
import { adminRoutes } from "constants/routes";
import AdminNav from "./AdminNav";
import Applications from "./Applications/Applications";
import Proposal from "./Proposals/Proposal";
import Proposals from "./Proposals/Proposals";
import Proposer from "./Proposer";

export default function Admin() {
  const dispatch = useSetter();
  const { providerId } = useGetWallet();

  useEffect(() => {
    dispatch(setCWContracts("apTeam"));
  }, [dispatch]);

  const { member, isMemberLoading } = useMember("apTeam");

  if (!providerId) {
    return <GuardPrompt message="Your wallet is not connected" />;
  } else if (isMemberLoading) {
    return <GuardPrompt message="Checking wallet credential" showLoader />;
  } else if (!member.weight) {
    return <GuardPrompt message="You are not authorized to view this page" />;
  } else
    return (
      <div className="padded-container min-h-3/4 grid grid-rows-a1 pb-4 gap-2">
        <AdminNav />
        <Routes>
          <Route path={`${adminRoutes.proposal}/:id`} element={<Proposal />} />
          <Route
            path={`${adminRoutes.proposal_types}/*`}
            element={<Proposer />}
          />
          <Route path={adminRoutes.proposals} element={<Proposals />} />
          <Route
            path={adminRoutes.charity_applications}
            element={<Applications />}
          />
          <Route index element={<Navigate to={adminRoutes.proposals} />} />
        </Routes>
      </div>
    );
}

export function GuardPrompt(props: { message: string; showLoader?: true }) {
  return (
    <div className="place-self-center grid content-center justify-items-center bg-white-grey text-angel-grey min-h-115 w-full max-w-sm p-4 rounded-md shadow-lg">
      {props.showLoader ? (
        <Loader
          gapClass="gap-2"
          bgColorClass="bg-angel-grey"
          widthClass="w-4"
        />
      ) : (
        <Icon type="Info" size={30} />
      )}
      <p className="mt-2">{props.message}</p>
    </div>
  );
}
