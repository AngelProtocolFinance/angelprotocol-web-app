import React, { ReactChildren, ReactChild, ReactNode } from "react";
import { FundDetails } from "contracts/types";
import { useFundList } from "services/terra/indexFund/queriers";

export default function FundSelection() {
  const { fundList, isFundListLoading } = useFundList();
  console.log(fundList);
  return (
    <table
      className="table-auto bg-light-grey shadow-inner-white-grey 
    rounded-md text-angel-grey text-left"
    >
      <TableSection<"heading"> rowClass="font-heading uppercase text-sm ">
        <>
          <th className="px-4 pt-2">fund id</th>
          <th className="px-4 pt-2">fund name</th>
        </>
      </TableSection>
      <TableSection<"body"> rowClass="border-b hover:bg-angel-blue hover:bg-opacity-10 cursor-pointer">
        {fundList.map((fund) => (
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

function TableSection<T extends "body" | "heading">(props: {
  children: T extends "body" ? JSX.Element[] : JSX.Element;
  rowClass: string;
}) {
  return (
    <tbody>
      {React.Children.map(props.children, (child) => (
        <tr className={props.rowClass}>{child}</tr>
      ))}
    </tbody>
  );
}

function Cells<T extends object>(props: {
  cellClass: string;
  attributes: T;
  toInclude: (keyof T)[];
}) {
  let cells: JSX.Element[] = [];
  for (const attr in props.attributes) {
    if (props.toInclude.includes(attr)) {
      cells.push(<td className={props.cellClass}>{props.attributes[attr]}</td>);
    }
  }
  return <>{cells}</>;
}
