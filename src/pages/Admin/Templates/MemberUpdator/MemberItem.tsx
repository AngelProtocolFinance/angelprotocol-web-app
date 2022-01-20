import { FaUserCircle } from "react-icons/fa";
import { CgUndo } from "react-icons/cg";
import { GiPieChart } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { MemberCopy } from "./types";
import maskAddress from "helpers/maskAddress";

export default function MemberItem(
  props: MemberCopy & {
    onClick: () => void;
  }
) {
  return (
    <li
      className={`flex gap-1 text-white text-opacity-80 items-center ${
        props.is_deleted ? "bg-failed-red" : "bg-white"
      } ${
        props.is_added ? "bg-opacity-40" : "bg-opacity-10"
      } rounded-md px-2 py-1 w-full`}
    >
      <FaUserCircle />
      <span className={`${props.is_deleted ? "line-through" : ""}`}>
        {" "}
        {maskAddress(props.addr)}
      </span>
      <GiPieChart className="ml-auto" />
      <span> {props.weight}</span>
      <button
        onClick={props.onClick}
        type="button"
        className="bg-white bg-opacity-30 ml-2 rounded-md p-0.5"
      >
        {props.is_added || props.is_deleted ? <CgUndo /> : <IoClose />}
      </button>
    </li>
  );
}
