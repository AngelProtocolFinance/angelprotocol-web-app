import TableEntry from "./TableEntry";
import Heading from "./Heading";
import { Balance } from "contracts/types";

export default function TableView(props: { charities: [string, Balance][] }) {
  return (
    <div className="hidden md:block self-start w-full h-leader-table pl-4 overflow-y-scroll">
      <table className="border-collapse table-auto w-full">
        <thead className="">
          <tr>
            <Heading text="" />
            <Heading text="Total" />
            <Heading text="10YR Projection" />
          </tr>
        </thead>
        <tbody>
          {props.charities.map(([address, balance], idx) => (
            <TableEntry key={idx} balance={balance} address={address} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
