import { CgUndo } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { Cells } from "components/TableSection/TableSection";
import defaultIcon from "assets/icons/tca/Angel-Alliance-logo.png";

import {
  AllianceMemberWithFlags,
  toggleDeleteExistingMember,
  undoAddMember,
} from "services/admin/allianceMembers";
import { useSetter } from "store/accessors";

export default function Member(props: AllianceMemberWithFlags) {
  const dispatch = useSetter();

  function memberItemAction() {
    if (props.isAdded) {
      dispatch(undoAddMember(props.wallet));
    } else {
      dispatch(toggleDeleteExistingMember(props.wallet));
    }
  }
  return (
    <Cells
      type="td"
      cellClass={`p-2 ${
        props.isAdded
          ? "bg-green-400 bg-opacity-20"
          : props.isDeleted
          ? "bg-red-400 bg-opacity-10"
          : ""
      }`}
    >
      <img
        src={props.logo || defaultIcon}
        alt=""
        className="w-8 h-8 object-contain"
      />
      <>{props.name}</>
      <span className="font-mono text-sm">{props.wallet}</span>
      <button
        onClick={memberItemAction}
        type="button"
        className="bg-white bg-opacity-30 ml-2 rounded-md p-0.5"
      >
        {props.isAdded || props.isDeleted ? <CgUndo /> : <IoClose />}
      </button>
    </Cells>
  );
}
