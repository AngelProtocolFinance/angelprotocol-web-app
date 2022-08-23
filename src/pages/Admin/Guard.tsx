import { PropsWithChildren, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminParams } from "./types";
import { AdminResources } from "services/types";
import { useAdminResourcesQuery } from "services/juno/custom";
import { WalletInfo, useWalletContext } from "contexts/Wallet";
import Icon from "components/Icon";
import Loader from "components/Loader";
import { chainIds } from "constants/chainIds";

export function Guard(props: PropsWithChildren<{}>) {
  const { info: walletInfo, isLoading: isWalletLoading } = useWalletContext();
  const { id } = useParams<AdminParams>();

  const { data, isLoading, isError } = useAdminResourcesQuery(
    {
      user: walletInfo?.address!,
      endowmentId: id!,
    },
    { skip: !walletInfo || !id }
  );

  if (isWalletLoading)
    return <GuardPrompt message="Connecting wallet" showLoader />;

  if (!walletInfo)
    return <GuardPrompt message="Your wallet is not connected" />;

  if (walletInfo.chainId !== chainIds.juno) {
    return <GuardPrompt message="Admin requires Juno compatible wallet" />;
  }

  if (isLoading)
    return <GuardPrompt message="Checking wallet credentials" showLoader />;

  if (isError) return <GuardPrompt message="Error getting wallet resoures" />;

  if (!data) return <GuardPrompt message="Unauthorized to view this page" />;

  return (
    <context.Provider value={{ ...data, wallet: walletInfo }}>
      {props.children}
    </context.Provider>
  );
}

type TAdmin = AdminResources & { wallet: WalletInfo };
const context = createContext({} as TAdmin);
export const useAdminResources = (): TAdmin => {
  const val = useContext(context);

  if (Object.entries(val).length <= 0) {
    throw new Error("useAdminResources should only be used inside AdminGuard");
  }
  return val;
};

export function GuardPrompt(props: { message: string; showLoader?: true }) {
  return (
    <div className="place-self-center grid content-center justify-items-center bg-white-grey text-angel-grey min-h-[15rem] w-full max-w-sm p-4 rounded-md shadow-lg">
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
