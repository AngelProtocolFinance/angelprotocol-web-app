import { ReactNode, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminParams } from "./types";
import { AdminResources, PropMeta } from "services/types";
import { SettingsController } from "types/contracts";
import { customApi, useAdminResourcesQuery } from "services/juno/custom";
import { defaultProposalTags } from "services/juno/tags";
import { useModalContext } from "contexts/ModalContext";
import { WalletState, useGetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import Loader from "components/Loader";
import { TxPrompt } from "components/Prompt";
import { blockTime } from "helpers/admin";
import { chainIds } from "constants/chainIds";
import { adminRoutes, appRoutes } from "constants/routes";

type Prompt = () => void;

export type TxResource = {
  isDelegated?: boolean;
  txMeta: PropMeta;
  wallet: WalletState;
};

type Operation =
  | keyof SettingsController
  | "withdraw-liquid"
  | "withdraw-locked";

type Assertions = {
  checkSubmit(operation?: Operation[]): TxResource | Prompt;
};

export function Context(props: {
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

  const checkSubmit: Assertions["checkSubmit"] = (operation) => {
    if (!wallet) {
      return () => showModal(TxPrompt, { error: "Wallet is not connected" });
    }
    if (wallet.chain.chain_id !== chainIds.polygon) {
      return () =>
        showModal(TxPrompt, { error: "Kindly switch to polygon network" });
    }

    /** getWallet() can't be ran without Admin context being initalized first */
    const _d = data!;
    const hasOps = _d.type === "charity" && operation && operation.length > 0;

    const isLocked =
      hasOps &&
      operation.some((op) => {
        switch (op) {
          case "withdraw-liquid":
          case "withdraw-locked":
            return false;
          default:
            return _d.settingsController[op].locked;
        }
      });

    if (isLocked) {
      return () =>
        showModal(TxPrompt, { error: "This setting has been locked forever." });
    }

    const isMaturityRestricted =
      hasOps &&
      operation.some((op) => {
        switch (op) {
          case "allowlistedBeneficiaries":
          case "allowlistedContributors":
          case "maturityTime":
          case "maturityAllowlist":
            return _d.maturityTime !== 0 && _d.maturityTime <= blockTime("now");
          default:
            return false;
        }
      });

    if (isMaturityRestricted) {
      return () =>
        showModal(TxPrompt, {
          error: "This operation is not allowed for matured accounts.",
        });
    }

    const sender = wallet.address;

    const isAdmin = _d.members.includes(sender);
    const isDelegated =
      hasOps &&
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

    /** in the context of tx submission */
    const willExecute: true | undefined =
      (_d.config.threshold === 1 && !_d.config.requireExecution) || isDelegated
        ? true
        : undefined;

    const message = willExecute
      ? "Successful transaction"
      : "Proposal successfully created";

    const url = willExecute
      ? `${appRoutes.admin}/${_d.id}`
      : `${appRoutes.admin}/${_d.id}/${adminRoutes.proposals}`;

    const description = willExecute ? "Go to admin home" : "Go to proposals";

    const txMeta: PropMeta = {
      willExecute,
      successMeta: { message, link: { url, description } },
      tagPayloads: [customApi.util.invalidateTags(defaultProposalTags)],
    };

    return { wallet, isDelegated, txMeta };
  };

  if (isLoading) return <Prompt message="Getting admin resources" showLoader />;

  if (isError || !data)
    return <Prompt message="Error getting admin resources" />;

  return (
    <context.Provider value={{ ...data, checkSubmit }}>
      {props.children(data)}
    </context.Provider>
  );
}

const context = createContext({} as AdminResources & Assertions);
export const useAdminResources = <
  T extends AdminResources["type"] = any
>(): Extract<AdminResources, { type: T }> & Assertions => {
  const val = useContext(context);

  if (Object.entries(val).length <= 0) {
    throw new Error("useAdminResources should only be used inside AdminGuard");
  }
  return val as any;
};

function Prompt(props: { message: string; showLoader?: true }) {
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
