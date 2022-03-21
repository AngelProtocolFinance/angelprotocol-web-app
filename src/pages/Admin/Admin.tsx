import { Navigate, Route, Routes } from "react-router-dom";
import { useConnectedWallet } from "@terra-money/use-wallet";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useMember } from "services/terra/admin/queriers";
import Loader from "components/Loader/Loader";
import { admin } from "constants/routes";
import Proposer from "./Proposer";
import Proposal from "./Proposals/Proposal";
import Proposals from "./Proposals/Proposals";
import AdminNav from "./AdminNav";
import AllianceMembers from "./AllianceMembers/AllianceMembers";
import { useEffect } from "react";
import { setCWContracts } from "services/admin/cwContracts";
import { useSetter } from "store/accessors";

export default function Admin() {
  const dispatch = useSetter();
  const wallet = useConnectedWallet();

  useEffect(() => {
    dispatch(setCWContracts("apTeam"));
  }, [dispatch]);

  const { member, isMemberLoading } = useMember("apTeam");

  if (!wallet) {
    return <GuardPrompt message="Your wallet is not connected" />;
  } else if (isMemberLoading) {
    return <GuardPrompt message="Checking wallet credential" showLoader />;
  } else if (!member.weight) {
    return <GuardPrompt message="You are not authorized to view this page" />;
  } else
    return (
      <div className="padded-container min-h-screen grid grid-rows-a1 pb-4 gap-2">
        <AdminNav />
        <Routes>
          <Route path={`${admin.proposal}/:id`} element={<Proposal />} />
          <Route path={`${admin.proposal_types}/*`} element={<Proposer />} />
          <Route path={admin.alliance} element={<AllianceMembers />} />
          <Route path={admin.proposals} element={<Proposals />} />
          <Route index element={<Navigate to={admin.proposals} />} />
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
        <AiOutlineInfoCircle size={30} />
      )}
      <p className="mt-2">{props.message}</p>
    </div>
  );
}
