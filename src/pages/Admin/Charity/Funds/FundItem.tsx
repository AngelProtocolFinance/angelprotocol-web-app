import type { FundItem as TFundItem } from "@better-giving/fundraiser";
import Prompt from "components/Prompt";
import { FundCreator } from "components/fundraiser";
import { appRoutes } from "constants/routes";
import { useAuthenticatedUser } from "contexts/Auth";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { ArrowRight, LoaderCircle, Split } from "lucide-react";
import { Link } from "react-router-dom";
import { useOptOutMutation } from "services/aws/endow-funds";

export const FundItem = (props: TFundItem & { endowId: number }) => {
  const user = useAuthenticatedUser();
  const isActive = new Date().toISOString() <= props.expiration && props.active;
  const isEditor = user.funds.includes(props.id);
  const [optOut, { isLoading: isOptingOut }] = useOptOutMutation();
  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();

  return (
    <div className="grid items-center border border-gray-l4 p-3 rounded-lg">
      <div className="flex items-start justify-between">
        <img
          src={props.logo}
          width={50}
          className="object-cover aspect-square rounded-full"
        />
        <span
          className={`ml-1 relative bottom-px uppercase text-center text-2xs rounded-full px-3 py-0.5 ${
            isActive ? "text-green bg-green-l4" : "text-red bg-red-l4"
          }`}
        >
          {isActive ? "active" : "closed"}
        </span>
      </div>

      <Link
        to={`${appRoutes.funds}/${props.id}`}
        className="mt-4 font-medium text-navy-l1 hover:text-blue-d1 font-heading"
      >
        {props.name}
      </Link>
      <FundCreator name={props.creator_name} id={props.creator_id} />

      <div className="grid border-t border-gray-l4 gap-x-6 p-3 items-center">
        <Link
          aria-disabled={!isActive || !isEditor}
          className={`flex items-center gap-x-1 text-sm hover:text-blue-d1 text-blue aria-disabled:pointer-events-none aria-disabled:text-gray ${
            isEditor ? "" : "invisible"
          }`}
          to={`${appRoutes.funds}/${props.id}/edit`}
        >
          <ArrowRight size={16} />
          <span>Edit</span>
        </Link>
        {/** fund item won't show once NPO opted out of it: so no need to hide this button */}
        <button
          className="font-heading bg-amber enabled:hover:bg-amber-d1 text-white rounded-full px-4 py-2 text-xs flex items-center gap-1 disabled:bg-gray-l1"
          disabled={isOptingOut}
          type="button"
          onClick={async () => {
            console.log(props.id);
            try {
              await optOut({
                fundId: props.id,
                endowId: props.endowId,
              }).unwrap();
              showModal(Prompt, {
                type: "success",
                children:
                  "You have successfully opted out of this fund. Changes will take effect shortly.",
              });
            } catch (err) {
              handleError(err, { context: "opting out of fund" });
            }
          }}
        >
          {isOptingOut ? (
            <LoaderCircle size={12} className="animate-spin" />
          ) : (
            <Split size={12} className="rotate-90" />
          )}

          <span>{isOptingOut ? "Opting out.." : "Opt out"}</span>
        </button>
      </div>
    </div>
  );
};
