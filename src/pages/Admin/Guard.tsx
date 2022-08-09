import { PropsWithChildren, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminParams } from "./types";
import { AdminResources } from "services/types";
import { useAdminResourcesQuery } from "services/juno/custom";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import Loader from "components/Loader";

export function Guard(props: PropsWithChildren<{}>) {
  const { wallet, isWalletLoading } = useGetWallet();
  const { address } = useParams<AdminParams>();

  const { data, isLoading, isError } = useAdminResourcesQuery(
    {
      user: wallet?.address!,
      endowment: address!,
    },
    { skip: !wallet }
  );

  if (isWalletLoading)
    return <GuardPrompt message="Connecting wallet" showLoader />;

  if (!wallet) return <GuardPrompt message="Your wallet is not connected" />;

  if (isLoading)
    return <GuardPrompt message="Checking wallet credentials" showLoader />;

  if (isError) return <GuardPrompt message="Error getting wallet resoures" />;

  if (!data) return <GuardPrompt message="Unauthorized to view this page" />;

  return <context.Provider value={data!}>{props.children}</context.Provider>;
}

const context = createContext({} as AdminResources);
export const useAdminResources = () => {
  const val = useContext(context);
  if (Object.entries(val).length <= 0 /** empty object */) {
    throw new Error("Can't use this hook outside AdminGuard scope");
  }
  return val;
};

export function GuardPrompt(props: { message: string; showLoader?: true }) {
  return (
    <div className="place-self-center grid content-center justify-items-center bg-white-grey text-angel-grey min-h-115 w-full max-w-sm p-4 rounded-md shadow-lg">
      {props.showLoader ? (
        <Loader
          gapClass="gap-2"
          bgColorClass="bg-angel-grey"
          widthClass="w-4"
        />
      ) : (
        <Icon type="Info" size={30} />
      )}
      <p className="mt-2">{props.message}</p>
    </div>
  );
}
