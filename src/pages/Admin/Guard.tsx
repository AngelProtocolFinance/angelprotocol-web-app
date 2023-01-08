import { ReactNode, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminParams } from "./types";
import { AdminResources } from "services/types";
import { useAdminResourcesQuery } from "services/juno/custom";
import { useGetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import Loader from "components/Loader";

export function Guard(props: {
  children(resources: AdminResources): ReactNode;
}) {
  const { wallet } = useGetWallet();
  const { id } = useParams<AdminParams>();

  const { data, isLoading, isError } = useAdminResourcesQuery(
    {
      user: wallet?.address!,
      endowmentId: id!,
    },
    { skip: !wallet || !id }
  );

  if (!wallet) return <GuardPrompt message="Your wallet is not connected" />;

  if (isLoading)
    return <GuardPrompt message="Checking wallet credentials" showLoader />;

  if (isError) return <GuardPrompt message="Error getting wallet resoures" />;

  if (!data) return <GuardPrompt message="Unauthorized to view this page" />;

  return (
    <context.Provider value={data}>{props.children(data)}</context.Provider>
  );
}

const context = createContext({} as AdminResources);
export const useAdminResources = (): AdminResources => {
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
