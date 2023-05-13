import { ReactNode, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminParams } from "./types";
import { AdminResources } from "services/types";
import { useAdminResourcesQuery } from "services/juno/custom";
import { useGetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import Loader from "components/Loader";
import PermissionHandler from "./PermissionHandler";

export function Guard(props: {
  children(resources: AdminResources): ReactNode;
}) {
  const { id } = useParams<AdminParams>();
  const { wallet } = useGetWallet();

  const { data, isLoading, isError } = useAdminResourcesQuery(
    {
      user: wallet?.address,
      endowmentId: id,
    },
    { skip: !id }
  );

  if (isLoading)
    return <GuardPrompt message="Getting admin resources" showLoader />;

  if (isError || !data)
    return <GuardPrompt message="Error getting admin resources" />;

  return (
    <context.Provider value={data}>
      <PermissionHandler data={data}>{props.children(data)}</PermissionHandler>
    </context.Provider>
  );
}

const context = createContext({} as AdminResources);
export const useAdminResources = <
  T extends AdminResources["type"] = any
>(): Extract<AdminResources, { type: T }> => {
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
