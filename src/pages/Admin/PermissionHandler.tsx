import { ReactNode } from "react";
import { AdminResources } from "services/types";
import { useGetWallet } from "contexts/WalletContext";

export default function PermissionHandler({
  data,
  children,
}: {
  data: AdminResources | undefined;
  children: ReactNode;
}) {
  const { wallet } = useGetWallet();

  return (
    <fieldset disabled={!wallet || !data?.members.includes(wallet.address)}>
      {children}
    </fieldset>
  );
}
