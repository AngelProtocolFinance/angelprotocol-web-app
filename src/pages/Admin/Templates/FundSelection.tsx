import { Path } from "react-hook-form";
import { FundIdContext } from "pages/Admin/types";
import TableSection, { Cells } from "components/TableSection/TableSection";
import useFundSelection from "./useFundSelection";

export default function FundSelection<T extends FundIdContext>(props: {
  fieldName: Path<T>;
}) {
  const { handleSelectRow, activeRow, unexpiredFundList } = useFundSelection<T>(
    props.fieldName
  );
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
        rowClass="border-b hover:bg-angel-blue hover:bg-angel-blue/10 cursor-pointer select-none"
        onRowSelect={handleSelectRow}
        selectedRow={activeRow}
        selectedClass="text-angel-blue"
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
