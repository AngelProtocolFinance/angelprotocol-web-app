import { FaUserCircle } from "react-icons/fa";
import { CgUndo } from "react-icons/cg";
import { GiPieChart } from "react-icons/gi";
import { BsPlusCircle } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import maskAddress from "helpers/maskAddress";
import { Member } from "services/terra/admin/types";
import useUpdateForm from "./useUpdateForm";

export type MemberCopy = Member & { is_deleted: boolean; is_added: boolean };
export default function UpdateForm() {
  const { membersCopy, get_updator, add_member } = useUpdateForm();
  return (
    <form className="bg-white bg-opacity-10 p-3 rounded-md shadow w-96">
      <div className="border-4 p-2 border-opacity-20 rounded-md mb-2">
        <GroupTitle title="Remove existing member" />
        <div className="flex flex-col gap-2 mb-2">
          {membersCopy.map((member) => (
            <MemberItem
              key={member.addr}
              {...member}
              onClick={get_updator(member)}
            />
          ))}
        </div>
      </div>

      <div className="border-4 p-2 border-opacity-20 rounded-md mb-2 grid">
        <GroupTitle title="Add new member" />
        <TextInput title="wallet address" />
        <TextInput title="weight" />
        <button
          onClick={add_member({
            addr: "address",
            weight: 1,
            is_added: true,
            is_deleted: false,
          })}
          type="button"
          className="justify-self-end rounded-full hover:bg-white hover:bg-opacity-30"
        >
          <BsPlusCircle className="text-3xl text-white text-opacity-80" />
        </button>
      </div>
      <button
        type="submit"
        className="bg-blue-accent text-sm w-full py-2 rounded-md uppercase text-white font-bold mt-4"
      >
        Propose changes
      </button>
    </form>
  );
}

function GroupTitle(props: { title: string }) {
  return (
    <p className="mb-2 uppercase font-semibold text-xs text-white font-heading ">
      {props.title}
    </p>
  );
}

function TextInput(props: { title: string }) {
  return (
    <div className="flex flex-col border-b-2 border-opacity-10 text-white text-opacity-80 mb-4">
      <label className="text-xs font-heading uppercase">{props.title}</label>
      <input type="text" className="bg-transparent focus:outline-none p-1" />
    </div>
  );
}

function MemberItem(
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
