const TableChip = ({ data, type = "text" }: any) => {
  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      {type === "anchor" ? (
        <a href="data">
          <span className="text-normal font-sans text-center">{data}</span>
        </a>
      ) : (
        <span className="text-normal font-sans text-center">{data}</span>
      )}
    </td>
  );
};
export default TableChip;
