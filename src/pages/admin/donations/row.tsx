import { Link } from "@remix-run/react";
import Copier from "components/copier";
import { Cells } from "components/table-section";
import { appRoutes } from "constants/routes";
import { dateFormat } from "helpers/date-format";
import { humanize } from "helpers/decimal";
import { maskAddress } from "helpers/mask-address";
import { CircleCheck, X } from "lucide-react";
import type { Donation } from "types/donations";

const Amount = ({ amount = 0 }) => {
  return amount >= 0.01 ? <>${humanize(amount)}</> : <>--</>;
};

export default function Row(
  props: Donation.Item & { hasMore?: boolean; classes?: string }
) {
  return (
    <Cells
      type="td"
      cellClass={`p-3 border-t border-gray-l3 max-w-[256px] truncate ${props.classes}`}
    >
      <span className="text-sm">{dateFormat(props.date)}</span>

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
      <>{props.is_recurring ? "Yes" : "No"}</>
      <>{props.symbol}</>
      <>{humanize(props.init_amount)}</>

      <Amount amount={props.final_amount_usd} />

      {props.via_id === "staging" || props.via_id === "fiat" ? (
        <>--</>
      ) : (
        <Copier
          size={16}
          text={props.id}
          classes="text-center inline-flex items-center gap-x-2 text-sm"
        >
          {maskAddress(props.id)}
        </Copier>
      )}

      <td className="relative">
        {!props.donor_details ? (
          <X
            //prevent icon size from affecting row height
            className="left-4 absolute top-1/2 -translate-y-1/2 text-red "
            size={22}
          />
        ) : (
          <CircleCheck
            className="left-4 absolute top-1/2 -translate-y-1/2  text-green"
            size={20}
          />
        )}
      </td>

      <>{props.donor_details?.full_name ?? "--"}</>
      <>{props.donor_details?.company ?? "--"}</>
      <>{props.donor_details?.kyc_email ?? "--"}</>
      <>{props.donor_details?.address?.line1 ?? "--"}</>
      <>{props.donor_details?.address?.line2 ?? "--"}</>
      <>{props.donor_details?.address?.city || "--"}</>
      <>{props.donor_details?.address?.state ?? "--"}</>
      <>{props.donor_details?.address?.zip_code ?? "--"}</>
      <>{props.donor_details?.address?.country ?? "--"}</>
    </Cells>
  );
}
