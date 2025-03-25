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

      {props.programId ? (
        <Link
          className="text-blue hover:text-blue-d1"
          to={`${appRoutes.marketplace}/${props.recipientId}/program/${props.programId}`}
        >
          {props.programName}
        </Link>
      ) : (
        <>--</>
      )}

      <>{props.appUsed === "bg-widget" ? "Donation Form" : "Marketplace"}</>
      <>{props.paymentMethod ?? "--"}</>
      <>{props.isRecurring ? "Yes" : "No"}</>
      <>{props.symbol}</>
      <>{humanize(props.initAmount)}</>

      <Amount amount={props.finalAmountUsd} />

      {props.viaId === "staging" || props.viaId === "fiat" ? (
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
        {!props.donorDetails ? (
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

      <>{props.donorDetails?.fullName ?? "--"}</>
      <>{props.donorDetails?.kycEmail ?? "--"}</>
      <>{props.donorDetails?.address?.line1 ?? "--"}</>
      <>{props.donorDetails?.address?.line2 ?? "--"}</>
      <>{props.donorDetails?.address?.city || "--"}</>
      <>{props.donorDetails?.address?.state ?? "--"}</>
      <>{props.donorDetails?.address?.zipCode ?? "--"}</>
      <>{props.donorDetails?.address?.country ?? "--"}</>
    </Cells>
  );
}
