const TableChip = ({ data, type = "text", link }: any) => {
  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
      {type === "anchor" ? (
        <a href={link}>
          <span className="text-normal font-sans text-center">{data}</span>
        </a>
      ) : (
        <span className="text-normal font-sans text-center">{data}</span>
      )}
    </td>
  );
};
export default TableChip;
