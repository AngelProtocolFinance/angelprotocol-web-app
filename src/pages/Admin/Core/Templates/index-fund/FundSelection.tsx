import { Path } from "react-hook-form";
import { FundIdContext } from "pages/Admin/types";
import TableSection, { Cells } from "components/TableSection";
import useFundSelection from "./useFundSelection";

export default function FundSelection<T extends FundIdContext>(props: {
  fieldName: Path<T>;
}) {
  const { handleSelectRow, activeRow, unexpiredFundList } = useFundSelection<T>(
    props.fieldName
  );
  return (
    <table className="table-auto rounded text-left bg-orange-l6 dark:bg-blue-d7">
      <TableSection
        type="thead"
        rowClass="border-b border-gray-l2 dark:border-bluegray"
      >
        <Cells type="th" cellClass="px-4 py-2 uppercase">
          <>fund id</>
          <>fund name</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b hover:bg-blue hover:bg-blue/10 cursor-pointer select-none"
        onRowSelect={handleSelectRow}
        selectedRow={activeRow}
        selectedClass="text-blue"
      >
        {unexpiredFundList.map((fund) => (
          <Cells key={fund.id} cellClass="px-4 py-2" type="td">
            <>{fund.id}</>
            <>{fund.name}</>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}
