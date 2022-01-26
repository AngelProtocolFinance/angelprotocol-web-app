const MemberHeader = () => {
  return (
    <thead>
      <tr className="grid grid-cols-4 border-b-2 border-gray-200 bg-gray-100 py-2">
        <th>
          <span className="uppercase text-xs font-semibold text-gray-700 text-center tracking-wider">
            Icon
          </span>
        </th>
        <th className="col-span-2">
          <span className="uppercase text-xs font-semibold text-gray-700 text-center tracking-wider">
            Name
          </span>
        </th>
        <th>
          <span className="uppercase text-xs font-semibold text-gray-700 text-center tracking-wider">
            Wallets
          </span>
        </th>
      </tr>
    </thead>
  );
};

const MemberRow = ({ onUpdateClick, member, index }: any) => {
  return (
    <tr
      key={index}
      className="grid grid-cols-4 bg-white border-b border-gray-200 bg-white"
    >
      <td className="justify-self-center">
        <img
          src={member.icon}
          alt=""
          className={`w-20 h-16 rounded-sm object-contain m-4 ${
            member.iconLight && "bg-gray-500"
          }`}
        />
      </td>
      <td className="col-span-2 self-center px-5 py-5 text-sm">
        <span className="text-normal font-sans">{member.name}</span>
      </td>
      <td className="self-center px-5 py-5 text-sm">
        <button
          onClick={() => onUpdateClick(index)}
          className="w-32 h-10 rounded-lg px-3 py-1 font-semibold bg-orange shadow-md text-white hover:text-gray-600 font-heading"
        >
          Remove {/* Edit */}
        </button>
      </td>
    </tr>
  );
};

// const AllianceMembersTable = ({ members, onEditClick }: any) => {
const AllianceMembersTable = ({ members, onRemoveClick }: any) => {
  return (
    <table className="min-w-full leading-normal">
      <MemberHeader />
      <tbody>
        {members.length > 0 &&
          members.map((member: any, index: number) => (
            <MemberRow
              key={index}
              member={member}
              index={index}
              // onUpdateClick={onEditClick}
              onUpdateClick={onRemoveClick}
            />
          ))}
      </tbody>
    </table>
  );
};

export default AllianceMembersTable;
