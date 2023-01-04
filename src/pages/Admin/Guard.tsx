import { ReactNode, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminParams } from "./types";
import { AdminResources } from "services/types";
import { useAdminResourcesQuery } from "services/juno/custom";
import {
  WithCosmosWallet,
  isConnected,
  isDisconnected,
  useWalletContext,
} from "contexts/WalletContext";
import Icon from "components/Icon";
import Loader from "components/Loader";

type State = WithCosmosWallet<AdminResources>;

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
    { skip: !user || !id }
  );

  if (wallet === "loading")
    return <GuardPrompt message="Connecting wallet.." showLoader />;

  if (isDisconnected(wallet))
    return <GuardPrompt message="Wallet is not connected" />;

  if (wallet.type !== "cosmos")
    return <GuardPrompt message="Admin doesn't support connected wallet" />;

  if (isLoading)
    return <GuardPrompt message="Checking wallet credentials" showLoader />;

  if (isError) return <GuardPrompt message="Error getting wallet resoures" />;

  if (!data) return <GuardPrompt message="Unauthorized to view this page" />;

  return (
    <context.Provider value={{ ...data, wallet }}>
      {props.children(data)}
    </context.Provider>
  );
}

const context = createContext({} as State);
export const useAdminResources = (): State => {
  const val = useContext(context);

  if (Object.entries(val).length <= 0) {
    throw new Error("useAdminResources should only be used inside AdminGuard");
  }
  return val;
};

function GuardPrompt(props: { message: string; showLoader?: true }) {
  return (
    <div className="place-self-center grid content-center justify-items-center min-h-[15rem] w-full bg-white dark:bg-blue-d6 border border-gray-l2 dark:border-bluegray max-w-sm p-4 rounded">
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
