import Copier from "components/copier";
import { Cells } from "components/table-section";
import { appRoutes } from "constants/routes";
import { toPP } from "helpers/date";
import { centsDecimals, humanize, roundToCents } from "helpers/decimal";
import { mask_string } from "helpers/mask-string";
import { Link } from "react-router";
import type { Donation } from "types/donations";
import { AmountFlow } from "./amount-flow";

export default function Row(
  props: Donation.Item & { hasMore?: boolean; classes?: string }
) {
  return (
    <Cells
      type="td"
      cellClass={`p-3 border-t border-gray-l3 max-w-[256px] truncate ${props.classes}`}
    >
      <Copier
        size={16}
        text={props.id}
        classes="text-center inline-flex items-center gap-x-2 text-sm"
      >
        {mask_string(props.id)}
      </Copier>
      <span className="text-sm">{toPP(props.date)}</span>
      {props.program_id ? (
        <Link
          className="text-blue hover:text-blue-d1"
          to={`${appRoutes.marketplace}/${props.recipient_id}/program/${props.program_id}`}
        >
          {props.program_name}
        </Link>
      ) : (
        <>--</>
      )}

      <>{props.app_used === "bg-widget" ? "Donation Form" : "Marketplace"}</>
      <>{props.payment_method ?? "--"}</>
      <td>
        <div>
          {props.symbol}{" "}
          {roundToCents(
            props.init_amount,
            centsDecimals(
              (props.final_amount_usd || 0) /
                (props.init_amount || Number.MAX_SAFE_INTEGER)
            )
          )}{" "}
          {props.symbol !== "USD" && (
            <span className="text-gray">
              ${humanize(props.final_amount_usd || 0)}
            </span>
          )}
          <p className="text-2xs text-gray-d1 uppercase">
            {props.is_recurring ? "recurring" : "one time"}
          </p>
        </div>
      </td>
      <td>
        <AmountFlow
          total={props.final_amount_usd ?? 0}
          allocation={props.allocation ?? { liq: 100, lock: 0, cash: 0 }}
        />
        {/* <div>{JSON.stringify(props.allocation)}</div> */}
      </td>

      <td>
        <div>{props.donor_details?.full_name ?? "--"}</div>
        <div className="text-xs text-gray-d1">
          {props.donor_details?.kyc_email}
        </div>
        <p className="text-xs text-gray-d1 mt-0.5">
          {[
            props.donor_details?.address?.line1,
            props.donor_details?.address?.line2,
            props.donor_details?.address?.city,
            props.donor_details?.address?.state,
            props.donor_details?.address?.zip_code,
            props.donor_details?.address?.country,
          ]
            .filter(Boolean)
            .join(", ")}
        </p>
        <p className="text-xs text-gray-d1 mt-0.5">
          {props.donor_details?.company}
        </p>
      </td>
    </Cells>
  );
}
