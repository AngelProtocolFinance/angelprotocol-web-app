import React from "react";

export default function TableSection(props: HeadProps | BodyProps) {
  return React.createElement(props.type, {
    children: React.Children.map(props.children, (child, index) => {
      return (
        <tr
          key={index}
          onClick={props.onRowSelect && props.onRowSelect(index)}
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

export function Cells(props: {
  children: JSX.Element | JSX.Element[];
  type: "th" | "td";
  cellClass: string;
}) {
  const cells = React.Children.map(props.children, (child, index) => {
    return React.createElement(props.type, {
      key: index,
      className: props.cellClass,
      children: child,
    });
  });
  return <>{cells}</>;
}

type HeadProps = {
  type: "thead";
  children: JSX.Element;
  rowClass: string;
  onRowSelect?: never;
  selectedRow?: never;
};

type BodyProps = {
  type: "tbody";
  children: JSX.Element[] | JSX.Element;
  rowClass: string;
  onRowSelect?: (rowIndex: number) => () => void;
  selectedRow?: number;
};
