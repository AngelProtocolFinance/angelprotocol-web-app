import { ReactNode, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminParams } from "./types";
import { AdminResource, MultisigConfig } from "services/types";
import { SettingsController } from "types/contracts";
import { SenderArgs } from "types/tx";
import { useAdminResourceQuery } from "services/juno/custom";
import { defaultProposalTags, invalidateSubgraphTags } from "services/subgraph";
import { WalletState, useGetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import Loader from "components/Loader";
import { blockTime, hasElapsed } from "helpers/admin";
import { chainIds } from "constants/chainIds";
import { adminRoutes, appRoutes } from "constants/routes";

export function Context(props: {
  children(resources: AdminResource): ReactNode;
}) {
  const { id } = useParams<AdminParams>();

  const { data, isLoading, isError } = useAdminResourceQuery(
    { endowmentId: id },
    { skip: !id }
  );

  if (isLoading) return <Prompt message="Getting admin resources" showLoader />;

  if (isError || !data)
    return <Prompt message="Error getting admin resources" />;

  return (
    <context.Provider value={data}>{props.children(data)}</context.Provider>
  );
}

export type Operation =
  | keyof SettingsController
  | "withdraw-liquid"
  | "withdraw-locked";

export type TxMeta = Required<
  Pick<SenderArgs, "successMeta" | "tagPayloads">
> & {
  willExecute?: true;
};

export type TxResource = {
  isDelegated?: boolean;
  txMeta: TxMeta;
  wallet: WalletState;
};
type Tooltip = string;

type AdminType = AdminResource["type"];
type Resource<T extends AdminType> = Extract<AdminResource, { type: T }>;

type AdminContext<T extends AdminType> = Extract<AdminResource, { type: T }> & {
  txResource: TxResource | Tooltip;
};

const context = createContext({} as AdminResource);
export const useAdminContext = <T extends AdminType = any>(
  operations?: Operation[]
): AdminContext<T> => {
  const resource = useContext(context) as Resource<T>;
  const { wallet, isLoading } = useGetWallet();

  if (Object.entries(resource).length <= 0) {
    throw new Error("useAdminContext should only be used inside AdminGuard");
  }

  if (!wallet) {
    return { txResource: "Read-only: wallet not connected", ...resource };
  }

  if (isLoading) {
    return { txResource: "Read-only: wallet is loading..", ...resource };
  }

  if (wallet.chain.chain_id !== chainIds.polygon) {
    return {
      txResource: "Read-only: wallet not connected to Polygon",
      ...resource,
    };
  }

  const sender = wallet.address;
  const isAdmin = resource.members.includes(sender);

  // handle non-endowment admins
  if (resource.type !== "charity") {
    if (!isAdmin)
      return {
        ...resource,
        txResource: "Read-only: not member of multisig",
      };
    return {
      ...resource,
      txResource: {
        isDelegated: false,
        txMeta: txMeta(resource.id, resource.config, false),
        wallet,
      },
    };
  }

  const {
    settingsController,
    allowlistedBeneficiaries,
    maturityAllowlist,
    maturityTime,
    closed,
    closingBeneficiary,
  } = resource as Resource<"charity">; //manual control flow
  const hasOps = operations && operations.length > 0;

  const isLocked =
    hasOps &&
    operations.some((op) => {
      switch (op) {
        case "withdraw-liquid":
        case "withdraw-locked":
          return false;
        default:
          return settingsController[op].locked;
      }
    });

  if (isLocked) {
    return {
      ...resource,
      txResource: "Read-only: locked forever",
    };
  }

  const isMaturityRestricted =
    hasOps &&
    operations.some((op) => {
      switch (op) {
        case "allowlistedBeneficiaries":
        case "allowlistedContributors":
        case "maturityAllowlist":
          return maturityTime !== 0 && maturityTime <= blockTime("now");
        default:
          return false;
      }
    });

  if (isMaturityRestricted) {
    return {
      ...resource,
      txResource: "Read-only: account is already matured.",
    };
  }

  const isDelegated =
    hasOps &&
    operations.every((op) => {
      switch (op) {
        case "withdraw-liquid":
          // if beneficiary is endowment, sender must be multisig
          if (closed) {
            return (
              closingBeneficiary.type === "wallet" &&
              closingBeneficiary.value === sender
            );
          }
          return allowlistedBeneficiaries.includes(sender);
        case "withdraw-locked":
          // if beneficiary is endowment, sender must be multisig
          if (closed) {
            return (
              closingBeneficiary.type === "wallet" &&
              closingBeneficiary.value === sender
            );
          }
          return maturityAllowlist.includes(sender);
        default:
          const { addr, expires } = settingsController[op].delegate;
          return (
            addr === sender && (expires !== 0 ? !hasElapsed(expires) : true)
          );
      }
    });

  if (!isAdmin && !isDelegated) {
    return {
      ...resource,
      txResource: "Read-only: not member of multisig nor a delegate",
    };
  }
  return {
    ...resource,
    txResource: {
      isDelegated,
      txMeta: txMeta(resource.id, resource.config, !!isDelegated),
      wallet,
    },
  };
};

export const isTooltip = (val: TxResource | Tooltip): val is Tooltip =>
  typeof val === "string";

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

function txMeta(
  id: number,
  config: MultisigConfig,
  isDelegated: boolean
): TxMeta {
  /** in the context of tx submission */
  const willExecute: true | undefined =
    (config.threshold === 1 && !config.requireExecution) || isDelegated
      ? true
      : undefined;

  const message = willExecute
    ? "Successful transaction"
    : "Proposal successfully created";

  const url = willExecute
    ? `${appRoutes.admin}/${id}`
    : `${appRoutes.admin}/${id}/${adminRoutes.proposals}`;

  const description = willExecute ? "Go to admin home" : "Go to proposals";

  return {
    willExecute,
    successMeta: { message, link: { url, description } },
    tagPayloads: [invalidateSubgraphTags(defaultProposalTags)],
  };
}
