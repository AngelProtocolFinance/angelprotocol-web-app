import type { FundItem as TFundItem } from "@better-giving/fundraiser";
import { appRoutes } from "constants/routes";
import { useAuthenticatedUser } from "contexts/Auth";
import { useErrorContext } from "contexts/ErrorContext";
import { Link } from "react-router-dom";
import { useOptOutMutation } from "services/aws/endow-funds";

export const FundItem = (props: TFundItem & { endowId: number }) => {
  const user = useAuthenticatedUser();
  const isActive = new Date().toISOString() <= props.expiration && props.active;
  const isEditor = user.funds.includes(props.id);
  const [optOut, { isLoading: isOptingOut }] = useOptOutMutation();
  const { handleError } = useErrorContext();

  return (
    <div className="grid grid-cols-subgrid col-span-5 items-center gap-3 rounded border border-gray-l4">
      <img src={props.logo} className="object-cover h-full w-10" />
      <span className="mr-4 p-1.5 font-medium text-navy-l1">{props.name}</span>
      <p
        className={`uppercase justify-self-start text-2xs rounded-full px-3 py-0.5 ${
          isActive ? "text-green bg-green-l4" : "text-red bg-red-l4"
        }`}
      >
        {isActive ? "active" : "closed"}
      </p>
      <Link
        aria-disabled={!isActive || !isEditor}
        className={`text-sm hover:text-blue-d1 text-blue uppercase p-3 aria-disabled:pointer-events-none aria-disabled:text-gray ${
          isEditor ? "" : "invisible"
        }`}
        to={`${appRoutes.funds}/${props.id}/edit`}
      >
        edit
      </Link>
      <Link
        className="text-sm hover:text-blue-d1 text-blue uppercase p-3"
        to={`${appRoutes.funds}/${props.id}`}
      >
        view
      </Link>
      {/** show only when this endow is member of fund */}
      <button
        disabled={isOptingOut}
        type="button"
        onClick={async () => {
          console.log(props.id);
          try {
            await optOut({ fundId: props.id, endowId: props.endowId }).unwrap();
          } catch (err) {
            handleError(err, { context: "opting out of fund" });
          }
        }}
      >
        {isOptingOut ? "opting out.." : "opt-out"}
      </button>
    </div>
  );
};
