import { NavLink } from "react-router-dom";
import Icon, { IconTypes } from "components/Icon";
import useHorizontalScroll from "hooks/useHorizontalScroll";
import { createNavLinkStyler } from "helpers";
import { profileRoutes } from "constants/routes";

export default function Nav(props: { classes?: string }) {
  const { ref, forward, backward, showBack, showForward } = useHorizontalScroll(
    { duration: 300 }
  );

  return (
    //bounding box to anchor buttons
    <div className={`relative ${props.classes || ""} my-3`}>
      <div ref={ref} className="overflow-hidden overflow-x-auto scroll-hidden">
        <div className="bg-white text-angel-grey text-sm grid grid-cols-[repeat(4,_minmax(8rem,_1fr))] divide-x">
          <NavLink end to={profileRoutes.overview} className={styler}>
            overview
          </NavLink>
          <NavLink to={profileRoutes.endowment} className={styler}>
            endowment
          </NavLink>
          <NavLink to={profileRoutes.programs} className={disabledClass}>
            programs
          </NavLink>
          <NavLink to={profileRoutes.media} className={disabledClass}>
            media
          </NavLink>
          {/* 
            NOTE: Governance will be reenabled when we relaunch the $HALO token 
            <NavLink to={profileRoutes.governance} className={disabledClass}>
              governance
            </NavLink> 
          */}
        </div>
        {showBack && (
          <Button _iconType="Back" onClick={backward} className="left-0" />
        )}
        {showForward && (
          <Button _iconType="Forward" onClick={forward} className="right-0" />
        )}
      </div>
    </div>
  );
}

const styler = createNavLinkStyler(
  "hover:text-white hover:bg-angel-blue font-semibold uppercase py-3 text-center",
  "bg-angel-blue text-white"
);

const disabledClass =
  "text-white-grey font-semibold bg-grey-accent uppercase py-3 text-center pointer-events-none";

function Button({
  _iconType,
  className,
  ...restProps
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  _iconType: IconTypes;
}) {
  return (
    <button
      {...restProps}
      className={`absolute top-0 ${
        className || ""
      } p-1 bg-blue-accent/50 group-hover:flex hover:bg-blue-accent/100 w-10 h-10 flex rounded-full items-center justify-center group`}
    >
      <Icon type={_iconType} className="text-white text-2xl " />
    </button>
  );
}
