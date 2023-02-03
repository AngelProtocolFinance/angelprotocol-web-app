import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  className?: string;
  children: string[];
};

export default function Breadcrumbs({ children, className = "" }: Props) {
  return (
    <div className={`flex justify-center items-center gap-1 ${className}`}>
      {React.Children.map(children, (child, i) => {
        const [title, to] = child.split("_");
        return (
          <Fragment key={i}>
            <NavLink
              end={i === 0}
              to={to}
              className={({ isActive }) =>
                `max-w-xs truncate ${
                  isActive
                    ? "font-bold cursor-default pointer-events-none"
                    : "underline hover:text-orange transition ease-in-out duration-300"
                }`
              }
            >
              {title}
            </NavLink>
            {i < children.length - 1 && ">"}
          </Fragment>
        );
      })}
    </div>
  );
}
