import TableEntry from "./TableEntry";
import Heading from "./Heading";
import { Update } from "services/aws/leaderboard/types";

export default function TableView(props: Update) {
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
          {props.endowments
            .filter((endowment) => !tier1Charities.includes(endowment.address))
            .map((endowment) => (
              <TableEntry key={endowment.address} {...endowment} />
            ))}
        </tbody>
      </table>
    </div>
  );
}
const tier1Charities = [
  "terra1mcf9lhce23znkpmvg6c5pxx0a36s03yamsklad",
  "terra1d5phnyr7e7l44yaathtwrh4f4mv5agajcy508f",
  "terra1g6ryawleq5ly9p8dygslpayarmraddkg3c6xc9",
  "terra16jm9vflz8ltw9yrrnarcuwt623ampadhhhyxke",
];
