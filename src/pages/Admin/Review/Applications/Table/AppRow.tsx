import { Link } from "react-router-dom";
import { CharityApplication } from "types/aws";
import Icon from "components/Icon";
import { Cells } from "components/TableSection";
import { adminRoutes } from "constants/routes";
import { statusColors } from "../constants";

export default function AppRow(props: CharityApplication) {
  return (
    <Cells type="td" cellClass="px-2 py-3" key={props.PK}>
      <>{props.CharityName}</>
      <>{props.CharityName_ContactEmail?.split("_")[1]}</>
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
        className="uppercase font-heading text-sm hover:text-blue active:text-orange flex gap-1 items-center"
      >
        <span>Review</span>
        <Icon type="Forward" />
      </Link>
    </Cells>
  );
}
