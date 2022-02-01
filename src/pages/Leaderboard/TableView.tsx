import TableEntry from "./TableEntry";
import Heading from "./Heading";
import { MergedEndowment } from "services/aws/endowments/types";

export default function TableView(props: { endowments: MergedEndowment[] }) {
  return (
    <div className="self-start w-full h-leader-table pl-4 overflow-y-scroll">
      <table className="border-collapse table-auto w-full">
        <thead className="">
          <tr>
            <Heading text="" />
            <Heading text="Total" />
            <Heading text="10YR Projection" />
          </tr>
        </thead>
        <tbody>
          {props.endowments.map((endowment) => (
            <TableEntry key={endowment.address} {...endowment} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
