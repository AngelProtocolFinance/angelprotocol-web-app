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
            Members
          </span>
        </th>
      </tr>
    </thead>
  );
};

const MemberRow = ({ onUpdateClick, member }: any) => {
  return (
    <tr className="grid grid-cols-4 bg-white border-b border-gray-200 bg-white">
      <td className="justify-self-center">
        <img
          src={member.icon}
          alt=""
          className="row-span-2 w-32 h-24 p-3 rounded-sm object-contain mr-4 m-1"
        />
      </td>
      <td className="col-span-2 self-center px-5 py-5 text-sm">
        <span className="text-normal font-sans">{member.name}</span>
      </td>
      <td className="self-center px-5 py-5 text-sm">
        <button
          onClick={onUpdateClick}
          className="w-32 h-10 rounded-lg px-3 py-1 font-semibold bg-orange shadow-md text-white hover:text-gray-600 font-heading"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

const AllianceMembersTable = ({ onEditClick }: any) => {
  return (
    <table className="min-w-full leading-normal">
      <MemberHeader />
      <tbody>
        {mockDataList.map((member: any) => (
          <MemberRow member={member} onUpdateClick={onEditClick}></MemberRow>
        ))}
      </tbody>
    </table>
  );
};

const mockDataList = [
  {
    name: "Global Brigades",
    icon: "https://charity-profile-images.s3.amazonaws.com/logo/global-brigades-logo.png",
  },
  {
    name: "Solar Electric Light Fund",
    icon: "https://charity-profile-images.s3.amazonaws.com/logo/self_logo_500px_transparent.png",
  },
  {
    name: "5Gyres",
    icon: "https://charity-profile-images.s3.amazonaws.com/logo/5gyres.jpg",
  },
];

export default AllianceMembersTable;
