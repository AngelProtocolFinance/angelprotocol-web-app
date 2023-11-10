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
            className={({ isActive }) =>
              `max-w-xs truncate ${
                isActive
                  ? "font-bold cursor-default pointer-events-none"
                  : "underline hover:text-blue-l2 transition ease-in-out duration-300"
              }`
            }
          >
            {item.title}
          </NavLink>
          {i < items.length - 1 && ">"}
        </Fragment>
      ))}
    </div>
  );
}
