import { Endowment } from "types/aws";
import Heading from "./Heading";
import TableEntry from "./TableEntry";

export default function TableView(props: { endowments: Endowment[] }) {
  return (
    <div className="self-start w-full h-[50rem] pl-4 overflow-y-scroll">
      <table className="border-collapse table-auto w-full">
        <thead>
          <tr>
            <Heading text="" />
            <Heading text="" />
            <Heading text="Total" />
            <Heading text="10YR Projection" />
          </tr>
        </thead>
        <tbody>
          {props.endowments.map((endowment) => (
            <TableEntry key={endowment.endowment_address} {...endowment} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
