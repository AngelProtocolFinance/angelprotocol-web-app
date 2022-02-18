import { FaUserCircle } from "react-icons/fa";
import { GiPieChart } from "react-icons/gi";
import maskAddress from "helpers/maskAddress";
import { useMembers } from "services/terra/admin/queriers";
import { Member } from "services/terra/admin/types";
import { useMemo } from "react";

export default function Members() {
  const { members } = useMembers();
  const total_weight = useMemo(
    () => members.reduce((sum, member) => sum + member.weight, 0),
    [members]
  );
  return (
    <div className="border border-opacity-10 p-3 bg-white bg-opacity-10 shadow-md rounded-md mt-2">
      <div className="flex justify-between">
        <p className="uppercase text-2xl font-bold text-white-grey mr-4">
          Members
        </p>
        <p className="flex gap-2 items-center text-white text-opacity-90 uppercase font-heading">
          <GiPieChart className="text-xl" />
          <span className="text-sm">total weight</span>
          <span className="font-bold">{total_weight}</span>
        </p>
      </div>

      <ul className="flex mt-2 gap-4">
        {members.map((member) => (
          <MemberItem key={member.addr} {...member} />
        ))}
      </ul>
    </div>
  );
}

function MemberItem(props: Member) {
  return (
    <li className="flex gap-1 text-white text-opacity-80 items-center bg-white bg-opacity-10 rounded-md px-2 py-1">
      <FaUserCircle />
      {maskAddress(props.addr)}
      <GiPieChart className="ml-4" />
      {props.weight}
    </li>
  );
}
