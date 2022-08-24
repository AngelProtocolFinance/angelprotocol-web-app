import { Link } from "react-router-dom";
import { useIsMemberQuery } from "services/juno/custom";
import { useWalletContext } from "contexts/WalletContext";
import { chainIds } from "constants/chainIds";
import { appRoutes } from "constants/routes";

export default function AdminLink(props: {
  className: string;
  id: number;
  label: string;
}) {
  const { wallet } = useWalletContext();
  const { data: isMember } = useIsMemberQuery(
    { user: wallet?.address!, endowmentId: `${props.id}` },
    { skip: !wallet || wallet.chainId !== chainIds.juno }
  );

  if (!isMember) return null;

  return (
    <Link to={`${appRoutes.admin}/${props.id}`} className={props.className}>
      {props.label}
    </Link>
  );
}
