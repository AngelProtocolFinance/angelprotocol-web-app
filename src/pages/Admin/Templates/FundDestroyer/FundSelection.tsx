import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useFundList } from "services/terra/indexFund/queriers";
import { FundDestroyValues } from "./fundDestroyerSchema";

export default function FundSelection() {
  const { setValue } = useFormContext<FundDestroyValues>();

  const { fundList } = useFundList();
  const [activeRow, setActiveRow] = useState<number | undefined>();

  const selectRow = (rowIndex: number) => () => {
    setActiveRow(rowIndex);
  };

  useEffect(() => {
    if (activeRow !== undefined) {
      const fundId = fundList[activeRow].id;
      setValue("fundId", `${fundId}`);
    }
    //eslint-disable-next-line
  }, [activeRow]);

  return (
    <table
      className="table-auto bg-light-grey shadow-inner-white-grey 
    rounded-md text-angel-grey text-left"
    >
      <TableSection
        type="thead"
        rowClass="font-heading uppercase text-sm text-center"
      >
        <>
          <th className="px-4 pt-2">fund id</th>
          <th className="px-4 pt-2">fund name</th>
          <th className="px-4 pt-2">expiry height</th>
          <th className="px-4 pt-2">expiry time</th>
        </>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b hover:bg-angel-blue hover:bg-opacity-10 cursor-pointer select-none"
        selectRow={selectRow}
        selectedRow={activeRow}
      >
        {fundList.map((fund) => (
          <Cells
            key={fund.id}
            attributes={fund}
            toInclude={["id", "name", "expiry_height", "expiry_time"]}
            cellClass="font-mono px-4 py-2 text-center"
          />
        ))}
      </TableSection>
    </table>
  );
}

type HeadProps = {
  type: "thead";
  children: JSX.Element;
  rowClass: string;
  selectRow?: never;
  selectedRow?: never;
};

type BodyProps = {
  type: "tbody";
  children: JSX.Element | JSX.Element[];
  rowClass: string;
  selectRow: (rowIndex: number) => () => void;
  selectedRow: number | undefined;
};

function TableSection(props: HeadProps | BodyProps) {
  return React.createElement(props.type, {
    children: React.Children.map(props.children, (child, index) => {
      return (
        <tr
          onClick={props.selectRow && props.selectRow(index)}
          className={
            props.rowClass +
            ` ${
              props.selectedRow === index ? "font-extrabold text-red-400" : ""
            }`
          }
        >
          {child}
        </tr>
      );
    }),
  });
}

function Cells<T extends object>(props: {
  cellClass: string;
  attributes: T;
  toInclude: (keyof T)[];
}) {
  let cells: JSX.Element[] = [];
  for (const attr in props.attributes) {
    if (props.toInclude.includes(attr)) {
      cells.push(
        <td key={attr} className={props.cellClass}>
          {props.attributes[attr] || "n/a"}
        </td>
      );
    }
  }
  return <>{cells}</>;
}
