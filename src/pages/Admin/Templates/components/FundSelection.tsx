import TableSection, { Cells } from "../components/TableSection";
import useFundSelection from "./useFundSelection";

export type FundIdContext = { fundId: string };
export default function FundSelection<T extends FundIdContext>() {
  const { selectRow, activeRow, unexpiredFundList } = useFundSelection<T>();
  return (
    <table
      className="table-auto bg-light-grey shadow-inner-white-grey 
    rounded-md text-angel-grey text-left"
    >
      <TableSection type="thead" rowClass="font-heading uppercase text-sm">
        <>
          <th className="px-4 pt-2">fund id</th>
          <th className="px-4 pt-2">fund name</th>
        </>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b hover:bg-angel-blue hover:bg-opacity-10 cursor-pointer select-none"
        selectRow={selectRow}
        selectedRow={activeRow}
      >
        {unexpiredFundList.map((fund) => (
          <Cells
            key={fund.id}
            attributes={fund}
            toInclude={["id", "name"]}
            cellClass="font-mono px-4 py-2"
          />
        ))}
      </TableSection>
    </table>
  );
}
