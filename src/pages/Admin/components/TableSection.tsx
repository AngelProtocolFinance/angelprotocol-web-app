import React from "react";

export default function TableSection(props: HeadProps | BodyProps) {
  return React.createElement(props.type, {
    children: React.Children.map(props.children, (child, index) => {
      return (
        <tr
          key={index}
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
  children?: JSX.Element[] | JSX.Element;
  cellClass: string;
  attributes: T;
  toInclude: (keyof T)[];
}) {
  let cells: JSX.Element[] = [];
  //prepend with custom children
  const custom = React.Children.map(props.children || [], (child, i) => (
    <td className={props.cellClass} key={i}>
      {child}
    </td>
  ));

  for (const attr in props.attributes) {
    if (props.toInclude.includes(attr)) {
      cells.push(
        <td key={attr} className={props.cellClass}>
          {props.attributes[attr]}
        </td>
      );
    }
  }

  return <>{custom.concat(cells)}</>;
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
