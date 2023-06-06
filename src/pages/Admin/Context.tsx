import { ReactNode, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminParams } from "./types";
import { AdminResources, PropMeta } from "services/types";
import { SettingsController } from "types/contracts";
import { customApi, useAdminResourcesQuery } from "services/juno/custom";
import { defaultProposalTags } from "services/juno/tags";
import { WalletState, useGetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import Loader from "components/Loader";
import { isEmpty } from "helpers";
import { adminRoutes, appRoutes } from "constants/routes";

type Operation =
  | keyof SettingsController
  | "withdraw-liquid"
  | "withdraw-locked";

type TxMeta = PropMeta & {
  warning: string | null;
  isDirect: boolean;
};

type AdminContext<T extends AdminResources["type"] = any> = Extract<
  AdminResources,
  { type: T }
> & {
  wallet: WalletState;
  _tx: TxMeta;
};

export function Context(props: {
  children(resources: AdminResources): ReactNode;
}) {
  const { id } = useParams<AdminParams>();

  const { data, isLoading, isError } = useAdminResourcesQuery(
    {
      endowmentId: id,
    },
    { skip: !id }
  );

  if (isLoading)
    return <GuardPrompt message="Getting admin resources" showLoader />;

  if (isError || !data)
    return <GuardPrompt message="Error getting admin resources" />;

  return (
    <context.Provider value={{ ...data }}>
      {props.children(data)}
    </context.Provider>
  );
}

const context = createContext({} as AdminResources);
export const useAdminContext = <T extends AdminResources["type"] = any>(
  ops?: Operation[]
): AdminContext<T> => {
  const admin = useContext(context);
  const { wallet } = useGetWallet();

  if (Object.entries(admin).length <= 0) {
    throw new Error("useAdminContext should only be used inside AdminGuard");
  }

  const sender = wallet?.address ?? "";
  const isDelegated =
    ops &&
    !isEmpty(ops) &&
    admin.type === "charity" &&
    ops.every((op) => {
      switch (op) {
        case "withdraw-liquid":
          return admin.allowlistedBeneficiaries.includes(sender);
        case "withdraw-locked":
          return admin.maturityAllowlist.includes(sender);
        default:
          return admin.settingsController[op].delegate.addr === sender;
      }
    });

  const willExecute: true | undefined =
    (admin.config.threshold === 1 && !admin.config.requireExecution) ||
    isDelegated
      ? true
      : undefined;

  const warning = (() => {
    if (!wallet) return "Wallet is not connected";
    const sender = wallet.address;
    const isOwner = admin.members.includes(sender);

    if (!isOwner || !isDelegated)
      return "Unauthorized: neither admin nor delegated for this transaction";

    return null;
  })();

  const message = willExecute
    ? "Successful transaction"
    : "Proposal successfully created";

  const url = willExecute
    ? `${appRoutes.admin}/${admin.id}`
    : `${appRoutes.admin}/${admin.id}/${adminRoutes.proposals}`;

  const description = willExecute ? "Go to admin home" : "Go to proposals";

  const meta: PropMeta = {
    successMeta: { message, link: { url, description } },
    tagPayloads: [customApi.util.invalidateTags(defaultProposalTags)],
  };

  const val: AdminContext = {
    ...admin,
    _tx: {
      ...meta,
      isDirect: isDelegated || false,
      warning,
      willExecute,
    },
    /** wallet checks are handled in UI which can't be communicated to event handlers,
     *  there for type asserted here, instead of asserting it on every method where wallet needs to be defined.
     *  Caveat: if UI calling the handler missed the check, exception will occur
     */
    wallet: wallet!,
  };

  return val as AdminContext<T>;
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
