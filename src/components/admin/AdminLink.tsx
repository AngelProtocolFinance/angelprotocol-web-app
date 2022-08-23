import { NavLinkProps } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useIsMemberQuery } from "services/juno/custom";
import { useWalletContext } from "contexts/Wallet";
import { chainIds } from "constants/chainIds";
import { appRoutes } from "constants/routes";

export function AdminLink(props: {
  className: NavLinkProps["className"];
  id: number;
  label: string;
}) {
  const { info: walletInfo } = useWalletContext();
  const { data: isMember } = useIsMemberQuery(
    { user: walletInfo?.address!, endowmentId: `${props.id}` },
    { skip: !walletInfo || walletInfo.chainId !== chainIds.juno }
  );

  if (!isMember) return null;

  return (
    <NavLink to={`${appRoutes.admin}/${props.id}`} className={props.className}>
      {props.label}
    </NavLink>
  );
}
