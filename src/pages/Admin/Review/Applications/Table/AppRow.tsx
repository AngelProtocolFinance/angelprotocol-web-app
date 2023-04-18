import { Link } from "react-router-dom";
import { EndowmentProposal } from "types/aws";
import Icon from "components/Icon";
import { Cells } from "components/TableSection";
import { SEPARATOR, statusColors } from "../../constants";

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
        to={`application/${
          props.application_id ?? "" /** appliation_id is a new field */
        }${SEPARATOR}${props.PK}`}
        className="uppercase text-sm hover:text-blue active:text-orange flex gap-1 items-center"
      >
        <span>Review</span>
        <Icon type="Forward" />
      </Link>
    </Cells>
  );
}
