import type { FundItem as TFundItem } from "@better-giving/fundraiser";
import Icon from "components/Icon";
import Prompt from "components/Prompt";
import { appRoutes } from "constants/routes";
import { useAuthenticatedUser } from "contexts/Auth";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { Link } from "react-router-dom";
import {
  useApproveMutation,
  useOptOutMutation,
} from "services/aws/endow-funds";

export const FundItem = (props: TFundItem & { endowId: number }) => {
  const user = useAuthenticatedUser();
  const isActive = new Date().toISOString() <= props.expiration && props.active;
  const isEditor = user.funds.includes(props.id);
  const [optOut, { isLoading: isOptingOut }] = useOptOutMutation();
  const [approve, { isLoading: isApproving }] = useApproveMutation();
  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();

  const isApproved = props.approvers.includes(props.endowId);

  return (
    <div className="grid grid-cols-subgrid col-span-6 items-center rounded border border-gray-l4">
      <img
        src={props.logo}
        className="col-start-1 row-span-2 object-cover w-28 aspect-square border-r border-gray-l4"
      />
      <Link
        to={`${appRoutes.funds}/${props.id}`}
        className="mr-4 pl-4 p-1.5 font-medium text-navy-l1 hover:text-blue-d1"
      >
        <span className="font-heading">{props.name}</span>

        <span
          className={`ml-1 relative bottom-px uppercase text-center text-2xs rounded-full px-3 py-0.5 ${
            isActive ? "text-green bg-green-l4" : "text-red bg-red-l4"
          }`}
        >
          {isActive ? "active" : "closed"}
        </span>
      </Link>

      <div className="grid grid-cols-subgrid col-start-2 col-span-5 border-t border-gray-l4 gap-x-6 p-3 items-center">
        <Link
          aria-disabled={!isActive || !isEditor}
          className={`flex items-center gap-x-1 text-sm hover:text-blue-d1 text-blue aria-disabled:pointer-events-none aria-disabled:text-gray ${
            isEditor ? "" : "invisible"
          }`}
          to={`${appRoutes.funds}/${props.id}/edit`}
        >
          <Icon type="ArrowRight" size={16} />
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
          <Icon
            type={isOptingOut ? "Loading" : "Split"}
            size={12}
            className={isOptingOut ? "animate-spin" : "rotate-90"}
          />
          <span>{isOptingOut ? "Opting out.." : "Opt out"}</span>
        </button>
        {!isApproved ? (
          <button
            className="font-heading bg-blue-d1 text-white rounded-full px-4 py-2 text-xs flex items-center gap-1 disabled:bg-gray-l1"
            disabled={isApproving}
            type="button"
            onClick={async () => {
              console.log(props.id);
              try {
                await approve({
                  fundId: props.id,
                  endowId: props.endowId,
                }).unwrap();
                showModal(Prompt, {
                  type: "success",
                  children:
                    "You have successfully approved this fund. Changes will take effect shortly.",
                });
              } catch (err) {
                handleError(err, { context: "approving fund" });
              }
            }}
          >
            <Icon
              type={isApproving ? "Loading" : "Verified"}
              size={16}
              className={isApproving ? "animate-spin" : ""}
            />
            <span>{isApproving ? "Approving.." : "Approve"}</span>
          </button>
        ) : (
          <div className="flex items-center gap-1 text-green">
            <Icon type="Verified" className="size-4" />
            <p className="text-xs">Approved</p>
          </div>
        )}
      </div>
    </div>
  );
};
