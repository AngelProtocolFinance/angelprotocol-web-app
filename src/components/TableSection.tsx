import React, { cloneElement } from "react";

export default function TableSection(props: HeadProps | BodyProps) {
  return React.createElement(props.type, {
    className: props.classes,
    children: React.Children.map(props.children, (child, index) => {
      return (
        <tr
          key={index}
          onClick={props.onRowSelect && props.onRowSelect(index)}
          className={
            props.rowClass +
            ` ${props.selectedRow === index ? props.selectedClass || "" : ""}`
          }
        >
          {child}
        </tr>
      );
    }),
  });
}

export function Cells(props: CellProps) {
  const cells = React.Children.map(props.children, (child, index) => {
    if (!child) {
      return null;
    }

    //return explicit element + common props
    if (child.type === "td" || child.type === "th") {
      return cloneElement(child, {
        ...child.props,
        key: index,
        className: child.props.className
          ? `${child.props.className} ${props.cellClass}`
          : props.cellClass,
      });
    }

    //for dual header tables make first cell of header <td/>
    if (props.dual) {
      return React.createElement(
        props.type === "th"
          ? //td first on headings
            index === 0
            ? "td"
            : "th"
          : //th first on body
            index === 0
            ? "th"
            : "td",
        {
          key: index,
          className:
            props.type === "td" && index === 0
              ? props.verticalHeaderClass || ""
              : props.cellClass,
          children: child,
        }
      );
    }

    //for vertical tables, no thead, and browser will warn if type === "th"
    if (props.vertical) {
      //th first on body
      return React.createElement(index === 0 ? "th" : "td", {
        key: index,
        className:
          index === 0 ? props.verticalHeaderClass || "" : props.cellClass,
        children: child,
      });
    }

    //for normal tables
    return React.createElement(props.type, {
      key: index,
      className: props.cellClass,
      children: child,
    });
  });

  return <>{cells}</>;
}

type CellBase = {
  children: JSX.Element | (JSX.Element | null)[] | null;
  type: "th" | "td";

  cellClass: string;
};

type CellHorizontal = CellBase & {
  vertical?: never;
  dual?: never;
  verticalHeaderClass?: never;
};
type CellVertical = CellBase & {
  vertical: true;
  dual?: never;
  verticalHeaderClass?: string;
};
type CellDual = CellBase & {
  dual: true;
  vertical?: never;
  verticalHeaderClass?: string;
};
type CellProps = CellHorizontal | CellVertical | CellDual;

type HeadProps = {
  type: "thead";
  classes?: string;
  children: JSX.Element;
  rowClass: string;
  onRowSelect?: never;
  selectedRow?: never;
  selectedClass?: never;
};

type BodyProps = {
  type: "tbody";
  classes?: string;
  children: JSX.Element[] | JSX.Element;
  rowClass: string;
  onRowSelect?: (rowIndex: number) => () => void;
  selectedRow?: number;
  selectedClass?: string;
};
