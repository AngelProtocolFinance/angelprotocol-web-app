import { PropsWithChildren, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminParams } from "./types";
import { AdminResources } from "services/types";
import { useAdminResourcesQuery } from "services/juno/custom";
import { ChainWallet, useChainWallet } from "contexts/ChainGuard";
import Icon from "components/Icon";
import Loader from "components/Loader";

export function Guard(props: PropsWithChildren<{}>) {
  const wallet = useChainWallet();
  const { id } = useParams<AdminParams>();

  const { data, isLoading, isError } = useAdminResourcesQuery({
    user: wallet.address,
    endowmentId: id!,
  });

  if (isLoading)
    return <GuardPrompt showLoader>Checking wallet credentials</GuardPrompt>;

  if (isError)
    return <GuardPrompt>Error verifying wallet credentials</GuardPrompt>;

  if (!data) return <GuardPrompt>Unauthorized to view this page</GuardPrompt>;

  return (
    <context.Provider value={{ ...data, wallet }}>
      {props.children}
    </context.Provider>
  );
}

type TAdmin = AdminResources & { wallet: ChainWallet };
const context = createContext({} as TAdmin);
export const useAdminResources = (): TAdmin => {
  const val = useContext(context);

  if (Object.entries(val).length <= 0) {
    throw new Error("useAdminResources should only be used inside AdminGuard");
  }
  return val;
};

export function GuardPrompt(
  props: PropsWithChildren<{ showLoader?: boolean }>
) {
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
      <div className="mt-2">{props.children}</div>
    </div>
  );
}
