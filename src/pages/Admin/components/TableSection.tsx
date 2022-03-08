import React from "react";

export default function TableSection(props: HeadProps | BodyProps) {
  return React.createElement(props.type, {
    children: React.Children.map(props.children, (child, index) => {
      return (
        <tr
          onClick={props.selectRow && props.selectRow(index)}
          className={
            props.rowClass +
            ` ${
              props.selectedRow === index
                ? "font-extrabold text-angel-blue"
                : ""
            }`
          }
        >
          {child}
        </tr>
      );
    }),
  });
}

export function Cells<T extends object>(props: {
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

type HeadProps = {
  type: "thead";
  children: JSX.Element;
  rowClass: string;
  selectRow?: never;
  selectedRow?: never;
};

type BodyProps = {
  type: "tbody";
  children: JSX.Element[] | JSX.Element;
  rowClass: string;
  selectRow?: (rowIndex: number) => () => void;
  selectedRow?: number;
};
