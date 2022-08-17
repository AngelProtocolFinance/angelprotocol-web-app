import { useParams } from "react-router-dom";
import { LinkProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { ProfileParams } from "./types";
import { templates } from "pages/Admin/constants";
import { useIsMemberQuery } from "services/juno/custom";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Icon, { IconTypes } from "components/Icon";
import { adminRoutes, appRoutes } from "constants/routes";

export default function Nav() {
  const { id } = useParams<ProfileParams>();
  const { wallet } = useGetWallet();
  const { data: isMember } = useIsMemberQuery(
    {
      user: wallet?.address!,
      endowmentId: id,
    },
    { skip: !wallet || !id }
  );

  return (
    <div className="lg:col-span-2 flex gap-2">
      <LinkIcon to={`${appRoutes.index}`} _iconType="ArrowBack">
        back to marketplace
      </LinkIcon>
      {isMember && (
        <LinkIcon
          to={`${appRoutes.admin}/${id}/${adminRoutes.templates}/${templates.acc_profile}`} //change to multisig edit
          _iconType="Edit"
          className="ml-auto border-r border-white/30 pr-2"
        >
          edit profile
        </LinkIcon>
      )}
      {isMember && (
        <LinkIcon
          to={`${appRoutes.admin}/${id}`} //change to updateProfile from RC-web-profile
          _iconType="Admin"
        >
          admin
        </LinkIcon>
      )}
    </div>
  );
}

function LinkIcon({
  _iconType,
  children,
  className,
  ...restProps
}: LinkProps & { _iconType: IconTypes }) {
  return (
    <Link
      {...restProps}
      className={`flex items-center gap-1 font-heading uppercase font-bold text-sm text-white hover:text-angel-blue ${className}`}
    >
      <Icon type={_iconType} className="text-xl" />
      <span className="hidden sm:inline">{children}</span>
    </Link>
  );
}
