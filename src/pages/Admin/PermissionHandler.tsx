import { ReactNode, useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { AdminResources } from "services/types";
import { useGetWallet } from "contexts/WalletContext";
import { adminRoutes, appRoutes } from "constants/routes";
import { useAdminResources } from "./Guard";

const ADMIN_ROUTE = `${appRoutes.admin}/:id/`;

export default function PermissionHandler({
  data,
  children,
}: {
  data: AdminResources | undefined;
  children: ReactNode;
}) {
  const { wallet } = useGetWallet();
  const currPath = useLocation().pathname;
  const [disableInputs, setDisableInputs] = useState(true);
  const { whitelistedBeneficiaries, members } = useAdminResources<"charity">();
  useEffect(() => {
    if (wallet) {
      const isMember = members.includes(wallet.address);
      const isWhitelisted = whitelistedBeneficiaries.includes(wallet.address);
      // allow deposits to any connected admin wallet
      if (matchPath(`${ADMIN_ROUTE}${adminRoutes.deposits}`, currPath))
        setDisableInputs(false);
      else setDisableInputs(!isMember && !isWhitelisted);
    } else setDisableInputs(true);
  }, [currPath, members, wallet, whitelistedBeneficiaries]);

  return <fieldset disabled={disableInputs}>{children}</fieldset>;
}
