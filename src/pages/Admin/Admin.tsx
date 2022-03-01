import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useConnectedWallet } from "@terra-money/use-wallet";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useMember } from "services/terra/admin/queriers";
import Loader from "components/Loader/Loader";
import { admin } from "constants/routes";
import Dashboard from "./Dashboard";
import Proposer from "./Proposer";
import Details from "./Proposals/Details";

export default function Admin() {
  const wallet = useConnectedWallet();
  //{match.path} is '/admin'
  const { member, isMemberLoading } = useMember();
  const { path } = useRouteMatch();

  if (!wallet) {
    return <GuardPrompt message="Your wallet is not connected" />;
  } else if (isMemberLoading) {
    return <GuardPrompt message="Checking wallet credential" showLoader />;
  } else if (!member.weight) {
    return <GuardPrompt message="You are not authorized to view this page" />;
  }
  return (
    <Switch>
      <Route path={`${path}/${admin.proposal}/:id`} component={Details} />
      <Route path={`${path}/${admin.proposal_types}`} component={Proposer} />
      <Route exact path={`${path}/${admin.index}`} component={Dashboard} />
    </Switch>
  );
}

function GuardPrompt(props: { message: string; showLoader?: true }) {
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
