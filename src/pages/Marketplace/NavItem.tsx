import { unsdgs } from "pages/unsdgs";
import { useRouteMatch, NavLink } from "react-router-dom";

export default function NavItem(props: { id: number }) {
  const { url } = useRouteMatch();
  const data = unsdgs[props.id];
  const is_all = props.id === 0;
  return (
    <NavLink
      exact
      to={`${url}/sdg/${props.id}`}
      className={(isActive) => {
        return `${
          isActive
            ? data.bg
            : `${is_all ? "bg-white" : "bg-blue-accent bg-opacity-60"}`
        } cursor-pointer w-16 h-10 p-1.5 ${
          isActive ? data.border : ""
        } border-2 border-opacity-30 rounded-md shadow-sm flex-none`;
      }}
    >
      <img
        src={data.icon}
        className="img-no-drag w-full h-full object-contain"
      />
    </NavLink>
  );
}
