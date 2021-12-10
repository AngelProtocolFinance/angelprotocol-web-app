import useClickScroll from "hooks/useClickScroll";
import AppHead from "components/Headers/AppHead";
import { Switch, useRouteMatch, Route, Redirect } from "react-router-dom";
import NavItem from "./NavItem";
import Category from "./Category";

export default function Marketplace2() {
  const { path } = useRouteMatch();
  const {
    ref,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  } = useClickScroll();

  return (
    <div className="pb-16 grid grid-rows-a1">
      <AppHead />
      <div className="padded-container grid content-start mt-2">
        {/**nav */}
        <h3 className="xl:text-center text-white-grey uppercase text font-semibold rounded-t-md mb-1">
          united nations sustainable development goals
        </h3>
        <div
          ref={ref}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className="flex gap-1 items-center xl:justify-center mb-2 overflow-x-scroll scroll-hidden"
        >
          {Array(17)
            .fill(null)
            .map((_, idx) => (
              <NavItem key={idx} id={idx} />
            ))}
        </div>
        {/**views */}
        <Switch>
          <Route path={`${path}/sdg/:id`} component={Category} />
          <Redirect to={`${path}/sdg/0`} />
        </Switch>
      </div>
    </div>
  );
}
