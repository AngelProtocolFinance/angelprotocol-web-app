import TableSection, { Cells } from "../components/TableSection";
import useFundSelection from "./useFundSelection";

export type FundIdContext = { fundId: string };
export default function FundSelection<T extends FundIdContext>() {
  const { handleSelectRow, activeRow, unexpiredFundList } =
    useFundSelection<T>();
  return (
    <table
      className="table-auto bg-light-grey shadow-inner-white-grey 
    rounded-md text-angel-grey text-left"
    >
      <TableSection type="thead" rowClass="border-b">
        <Cells type="th" cellClass="px-4 py-2 uppercase">
          <>fund id</>
          <>fund name</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b hover:bg-angel-blue hover:bg-opacity-10 cursor-pointer select-none"
        onRowSelect={handleSelectRow}
        selectedRow={activeRow}
      >
        {unexpiredFundList.map((fund) => (
          <Cells key={fund.id} cellClass="font-mono px-4 py-2" type="td">
            <>{fund.id}</>
            <>{fund.name}</>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}
