import { ReactNode, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminParams } from "./types";
import { AdminResources } from "services/types";
import { useAdminResourcesQuery } from "services/juno/custom";
import { useGetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import Loader from "components/Loader";

const data: AdminResources = {
  categories: { general: [1], sdgs: [1] },
  cw3: "juno1sae4p8crnac0h9m27psn205d6k586f7cnm4eshws623v05g95teqvj2s8q",
  cw4: "",
  id: 1,
  name: "",
  deposit_approved: true,
  config: {
    group_addr: "",
    max_voting_period: { height: 1, time: 1 },
    require_execution: true,
    threshold: { absolute_percentage: { percentage: "50" } },
  },
  endow_type: "Charity",
  kyc_donors_only: false,
  oneoff_vaults: { liquid: [""], locked: [""] },
  owner: "",
  pending_redemptions: 0,
  propMeta: {
    isAuthorized: true,
    successMeta: { message: "" },
    tagPayloads: [{ payload: [], type: "" }],
  },
  rebalance: {
    interest_distribution: "0",
    locked_interests_to_liquid: true,
    locked_principle_to_liquid: true,
    principle_distribution: "1",
    rebalance_liquid_invested_profits: true,
  },
  status: {
    Inactive: 0,
    Approved: 1,
    Frozen: 2,
    Closed: 3,
  },
  strategies: { liquid: [], locked: [] },
  type: "charity",
  withdraw_approved: true,
  withdraw_before_maturity: true,
};

export function Guard(props: {
  children(resources: AdminResources): ReactNode;
}) {
  // const { wallet } = useGetWallet();
  // const { id } = useParams<AdminParams>();

  // const { data, isLoading, isError } = useAdminResourcesQuery(
  //   {
  //     user: wallet?.address,
  //     endowmentId: id!,
  //   },
  //   { skip: !id }
  // );

  // if (isLoading)
  //   return <GuardPrompt message="Getting admin resources" showLoader />;

  // if (isError || !data)
  //   return <GuardPrompt message="Error getting admin resources" />;

  return (
    <context.Provider value={data}>{props.children(data)}</context.Provider>
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
