const TableHeader = ({ headerNames }: any) => {
  const style =
    "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider";
  return (
    <thead>
      <tr>
        {headerNames?.map((name: string, index: any) => (
          <th key={index} className={style}>
            {name}
          </th>
        ))}
      </tr>
    </thead>
  );
};
export default TableHeader;
