import { ReactNode, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminParams } from "./types";
import { AdminResources } from "services/types";
import { SettingsController } from "types/contracts";
import { useAdminResourcesQuery } from "services/juno/custom";
import { useModalContext } from "contexts/ModalContext";
import { WalletState, useGetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import Loader from "components/Loader";
import { TxPrompt } from "components/Prompt";
import { chainIds } from "constants/chainIds";

type Prompt = () => void;
type AdminWallet = WalletState & { isDelegated?: boolean };
type Operation =
  | keyof SettingsController
  | "withdraw-liquid"
  | "withdraw-locked";

type WalletObj = {
  getWallet(operation?: Operation[]): AdminWallet | Prompt;
};

export function Guard(props: {
  children(resources: AdminResources): ReactNode;
}) {
  const { id } = useParams<AdminParams>();
  const { wallet } = useGetWallet();
  const { showModal } = useModalContext();

  const { data, isLoading, isError } = useAdminResourcesQuery(
    {
      endowmentId: id,
    },
    { skip: !id }
  );

  const getWallet: WalletObj["getWallet"] = (operation) => {
    if (!wallet) {
      return () => showModal(TxPrompt, { error: "Wallet is not connected" });
    }
    if (wallet.chain.chain_id !== chainIds.polygon) {
      return () =>
        showModal(TxPrompt, { error: "Kindly switch to polygon network" });
    }

    /** getWallet() can't be ran without Admin context being initalized first */
    const _d = data!;
    const sender = wallet.address;

    const isAdmin = _d.members.includes(sender);
    const isDelegated =
      operation &&
      _d.type === "charity" &&
      operation.every((op) => {
        switch (op) {
          case "withdraw-liquid":
            return _d.allowlistedBeneficiaries.includes(sender);
          case "withdraw-locked":
            return _d.maturityAllowlist.includes(sender);
          default:
            return _d.settingsController[op].delegate.addr === sender;
        }
      });

    /**
     * check if user is admin,
     * if not, check if user is delegated for the operation
     */
    if (!isAdmin && !isDelegated) {
      return () =>
        showModal(TxPrompt, {
          error:
            "Unauthorized: Connected wallet is neither an admin nor delegated for this operation",
        });
    }

    return { ...wallet, isDelegated };
  };

  if (isLoading)
    return <GuardPrompt message="Getting admin resources" showLoader />;

  if (isError || !data)
    return <GuardPrompt message="Error getting admin resources" />;

  return (
    <context.Provider value={{ ...data, getWallet }}>
      {props.children(data)}
    </context.Provider>
  );
}

const context = createContext({} as AdminResources & WalletObj);
export const useAdminResources = <
  T extends AdminResources["type"] = any
>(): Extract<AdminResources, { type: T }> & WalletObj => {
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
