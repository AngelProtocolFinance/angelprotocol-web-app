import { Fragment } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  className?: string;
  items: {
    title: string;
    to: string;
  }[];
};

export default function Breadcrumbs({ items, className = "" }: Props) {
  return (
    <div className={`flex justify-center items-center gap-1 ${className}`}>
      {items.map((item, i) => (
        <Fragment key={i}>
          <NavLink
            to={item.to}
            className={({ isActive }) => (isActive ? "font-bold" : "underline")}
          >
            {item.title}
          </NavLink>
          {i < items.length - 1 && ">"}
        </Fragment>
      ))}
    </div>
  );
}
