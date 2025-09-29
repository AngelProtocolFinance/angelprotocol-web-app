import { Copier } from "components/copier";
import { Cells } from "components/table-section";
import { app_routes } from "constants/routes";
import { toPP } from "helpers/date";
import { centsDecimals, humanize, round_to_cents } from "helpers/decimal";
import { mask_string } from "helpers/mask-string";
import { Link } from "react-router";
import { AmountFlow } from "./amount-flow";
import type { IRow } from "./helpers";

export function Row(props: IRow & { has_more?: boolean; classes?: string }) {
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
          to={`${app_routes.marketplace}/${props.recipient_id}/program/${props.program_id}`}
        >
          {props.program_name}
        </Link>
      ) : (
        <>--</>
      )}

      <>
        {props.donation_origin === "bg-widget"
          ? "Donation Form"
          : "Marketplace"}
      </>
      <>{props.payment_method ?? "--"}</>
      <td>
        <div>
          {props.currency}{" "}
          {round_to_cents(
            +props.amount,
            centsDecimals(
              +props.usd_value / (+props.amount || Number.MAX_SAFE_INTEGER)
            )
          )}{" "}
          {props.currency !== "USD" && (
            <span className="text-gray">${humanize(props.usd_value || 0)}</span>
          )}
          <p className="text-2xs text-gray-d1 uppercase">{props.frequency}</p>
        </div>
      </td>
      <td>
        <AmountFlow
          total={+props.usd_value}
          allocation={props.allocation ?? { liq: 100, lock: 0, cash: 0 }}
        />
      </td>

      <td>
        <div>{props?.donor_name ?? "--"}</div>
        <div className="text-xs text-gray-d1">{props.donor_email}</div>
        <p className="text-xs text-gray-d1 mt-0.5">
          {[
            props?.street,
            props?.city,
            props?.state,
            props?.zip_code,
            props?.country,
          ]
            .filter(Boolean)
            .join(", ")}
        </p>
        <p className="text-xs text-gray-d1 mt-0.5">{props.donor_company}</p>
      </td>
    </Cells>
  );
}
