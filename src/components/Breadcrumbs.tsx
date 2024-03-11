import { Fragment } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  className?: string;
  items: {
    title: string;
    to: string;
    end?: boolean
  }[];
};

export default function Breadcrumbs({ items, className = "" }: Props) {
  return (
    <div className={`flex justify-center items-center gap-1 ${className}`}>
      {items.map((item, i) => (
        <Fragment key={i}>
          <NavLink
            end={item.end}
            to={item.to}
            className={({ isActive }) =>
              `max-w-xs truncate ${isActive
                ? "font-bold cursor-default pointer-events-none"
                : "underline hover:text-blue-d1"
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
