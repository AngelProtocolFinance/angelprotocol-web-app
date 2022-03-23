import { AiOutlineEdit } from "react-icons/ai";
import { MemberDetails } from "services/aws/alliance/types";
import defaultIcon from "assets/icons/tca/Angel-Alliance-logo.png";
import { useSetModal } from "components/Modal/Modal";
import TableSection, { Cells } from "../components/TableSection";
import MemberEditor from "./MemberEditor/MemberEditor";
import MemberForm from "./MemberEditor/MemberForm";

export default function MembersTable(props: { members: MemberDetails[] }) {
  const { showModal } = useSetModal();

  const showMemberEditor = (member: MemberDetails) => () => {
    const { isPlaceholder, ...restMemberDetails } = member;
    showModal(MemberEditor, {
      Form: MemberForm,
      initialValues: {
        ...restMemberDetails,
        type: isPlaceholder ? "new" : "edit",
        //used in PUT endpoint, where old name is used to query
        //entry to be updated
      },
    });
  };

  return (
    <table className="table-auto w-full border-collapse">
      <TableSection
        type="thead"
        rowClass="font-heading uppercase text-sm text-left"
      >
        <Cells type="th" cellClass="text-angel-blue p-2">
          <></>
          <>name</>
          <>wallet address</>
          <></>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b text-angel-grey group hover:text-angel-blue"
      >
        {props.members.map((member) => (
          <Cells key={member.address} type="td" cellClass="p-2">
            <img
              alt=""
              src={member.icon || defaultIcon}
              className="w-12 h-12 object-contain rounded-sm rounded-md ml-4"
            />
            <>{member.name}</>
            <span className="font-mono text-sm">{member.address}</span>
            <button
              className="group-hover:visible invisible active:text-red-400 mr-4"
              onClick={showMemberEditor(member)}
            >
              <AiOutlineEdit size={20} />
            </button>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}
