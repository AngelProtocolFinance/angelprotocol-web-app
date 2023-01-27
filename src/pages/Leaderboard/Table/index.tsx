import { LeaderboardEntry } from "types/aws";
import TableSection, { Cells } from "components/TableSection";
import Row from "./Row";

type Props = {
  endowments: LeaderboardEntry[];
  classes?: string;
};

export default function Table({ classes = "", endowments }: Props) {
  return (
    <div
      className={`${classes} h-[50rem] overflow-y-scroll scroller border border-prim rounded`}
    >
      <table className="border-collapse table-auto w-full">
        <TableSection
          type="thead"
          rowClass="border-b border-prim bg-orange-l6 dark:bg-blue-d6"
        >
          <Cells
            type="th"
            cellClass="text-left py-6 text-lg font-heading font-semibold"
          >
            <></>
            <>Organization</>
            <>Total</>
            <>10YR Projection</>
          </Cells>
        </TableSection>
        <TableSection
          type="tbody"
          rowClass="border-b border-gray-l3 dark:border-bluegray/70"
        >
          {endowments.map((endowment) => (
            <Row key={endowment.endowment_id} {...endowment} />
          ))}
        </TableSection>
      </table>
    </div>
  );
}
