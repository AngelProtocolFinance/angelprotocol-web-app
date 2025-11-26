import { Cells } from "components/table-section";
import { toPP } from "helpers/date";
import { humanize, ru_vdec, usdpu } from "helpers/decimal";
import { Link, href } from "react-router";
import { AmountFlow } from "./amount-flow";
import { Fees } from "./fees";
import type { IRow } from "./helpers";

export function Row(props: IRow & { has_more?: boolean; classes?: string }) {
  return (
    <Cells
      type="td"
      cellClass={`p-3 border-t border-gray-l3 max-w-[256px] truncate ${props.classes}`}
    >
      <span className="text-sm">{props.date ? toPP(props.date) : "--"}</span>
      {props.program_id ? (
        <Link
          className="text-blue hover:text-blue-d1"
          to={href("/marketplace/:id/program/:programId", {
            id: props.recipient_id.toString(),
            programId: props.program_id,
          })}
        >
          {props.program_name}
        </Link>
      ) : (
        <>--</>
      )}

      <td>
        {props.donation_origin === "bg-widget" ? (
          <div>
            <span>Donation Form</span>
            <span className="text-xs text-gray block">
              {props.donation_origin_id}
            </span>
          </div>
        ) : (
          "Marketplace"
        )}
      </td>
      <>{props.payment_method ?? "--"}</>
      <td>
        {props.currency}{" "}
        {ru_vdec(+props.amount, usdpu(+props.amount, +props.amount_usd))}{" "}
        {props.currency !== "USD" && (
          <span className="text-gray">${humanize(props.amount_usd || 0)}</span>
        )}
        <p className="text-2xs text-gray-d1 uppercase">{props.frequency}</p>
      </td>
      <td>
        <Fees {...props.fees} />
      </td>
      <td>${humanize(props.net_usd, 2)}</td>
      <td>
        <AmountFlow
          total={+props.net_usd}
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
