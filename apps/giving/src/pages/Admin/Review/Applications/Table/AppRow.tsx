import { Cells } from "@ap/components";
import Icon from "@ap/components/icon";
import { adminRoutes } from "@ap/constants";
import { Link } from "react-router-dom";
import { EndowmentProposal } from "@ap/types/aws";
import { statusColors } from "../constants";

export default function AppRow(props: EndowmentProposal) {
  return (
    <Cells type="td" cellClass="px-2 py-3" key={props.PK}>
      <>{props.OrganizationName}</>
      <>{props.Email}</>
      <>{new Date(props.RegistrationDate).toDateString()}</>
      <span
        className={`${
          statusColors[props.RegistrationStatus].text
        } uppercase text-sm`}
      >
        {props.RegistrationStatus}
      </span>

      <Link
        to={`${adminRoutes.proposal}/${props.poll_id}`}
        className="uppercase text-sm hover:text-blue active:text-orange flex gap-1 items-center"
      >
        <span>Review</span>
        <Icon type="Forward" />
      </Link>
    </Cells>
  );
}
