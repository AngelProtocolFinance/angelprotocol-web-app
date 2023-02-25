import { ReactNode, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminParams } from "./types";
import { AdminResources } from "services/types";
import { useAdminResourcesQuery } from "services/juno/custom";
import {
  CosmosWallet,
  isConnected,
  useWalletContext,
} from "contexts/WalletContext";
import Icon from "components/Icon";
import Loader from "components/Loader";

type WalletGetter = () => CosmosWallet | (() => void);
type Context = AdminResources & { getWallet: WalletGetter };

export function Guard(props: {
  children(resources: AdminResources): ReactNode;
}) {
  const wallet = useWalletContext();
  const { id } = useParams<AdminParams>();
  const user = isConnected(wallet) ? wallet.address : "";

  const { data, isLoading, isError } = useAdminResourcesQuery(
    {
      user,
      endowmentId: id!,
    },
    { skip: !id }
  );

  if (isLoading)
    return <GuardPrompt message="Getting admin resources" showLoader />;

  if (isError || !data)
    return <GuardPrompt message="Error getting admin resources" />;

  const getWallet: WalletGetter = () => {
    if (!isConnected(wallet)) {
      return () => toast.error("Wallet is not connected");
    }
    if (wallet.type !== "cosmos") {
      return () =>
        toast.error(`${wallet.name} doesn't support JUNO transactions`);
    }

    if (!data.propMeta.isAuthorized) {
      return () =>
        toast.error("Wallet is not authorized to perform this action");
    }

    return wallet;
  };

  return (
    <context.Provider value={{ ...data, getWallet }}>
      {props.children(data)}
    </context.Provider>
  );
}

const context = createContext({} as Context);
export const useAdminResources = <
  T extends AdminResources["type"] = any
>(): Extract<AdminResources, { type: T }> & { getWallet: WalletGetter } => {
  const val = useContext(context);

  if (Object.entries(val).length <= 0) {
    throw new Error("useAdminResources should only be used inside AdminGuard");
  }
  return val as any;
};

function GuardPrompt(props: { message: string; showLoader?: true }) {
  return (
    <div className="place-self-center grid content-center justify-items-center min-h-[15rem] w-full bg-white dark:bg-blue-d6 border border-prim max-w-sm p-4 rounded">
      {props.showLoader ? (
        <Loader
          gapClass="gap-2"
          bgColorClass="bg-gray-d2 dark:bg-white"
          widthClass="w-4"
        />
      ) : (
        <Icon type="Info" size={30} />
      )}
      <p className="mt-2">{props.message}</p>
    </div>
  );
}
