import React from "react";
import { Cells } from "components/TableSection/TableSection";
import defaultIcon from "assets/icons/tca/Angel-Alliance-logo.png";
import { AllianceMemberWithFlags } from "services/admin/allianceMembers";
import Icon from "components/Icons/Icons";
import useMember from "./useMember";

export default function Member(props: AllianceMemberWithFlags) {
  const { isEditable, isNotEdited, memberToggleEdit, memberToggleAddDelete } =
    useMember(props);
  return (
    <Cells
      type="td"
      cellClass={`p-2 ${
        props.isAdded
          ? "bg-green-400 bg-opacity-20"
          : props.isDeleted
          ? "bg-red-400 bg-opacity-10"
          : props.edits
          ? "bg-angel-orange bg-opacity-20"
          : ""
      }`}
    >
      <img
        src={props.edits?.logo || props.logo || defaultIcon}
        alt=""
        className="w-8 h-8 object-contain"
      />
      <>{props.edits?.name || props.name}</>
      <span className="font-mono text-sm">{props.wallet}</span>
      <div>
        {isEditable && (
          <Button
            _accent="hover:text-angel-orange"
            type="button"
            onClick={memberToggleEdit}
          >
            {props.edits ? <Icon type="Undo" /> : <Icon type="Edit" />}
          </Button>
        )}
        {isNotEdited && (
          <Button
            onClick={memberToggleAddDelete}
            type="button"
            _accent="hover:text-red-400"
          >
            {props.isAdded || props.isDeleted ? (
              <Icon type="Undo" />
            ) : (
              <Icon type="Edit" />
            )}
          </Button>
        )}
      </div>
    </Cells>
  );
}

function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { _accent?: string }
) {
  const { _accent, ...restProps } = props;
  return (
    <button
      {...restProps}
      className={
        "bg-white bg-opacity-30 ml-2 rounded-md p-0.5 " + _accent || ""
      }
    />
  );
}
