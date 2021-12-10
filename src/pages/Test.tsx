import useClickScroll from "hooks/useClickScroll";
import AppHead from "components/Headers/AppHead";
import { AiFillYoutube } from "react-icons/ai";
import { HiGlobeAlt } from "react-icons/hi";
import {
  Switch,
  useRouteMatch,
  Route,
  RouteComponentProps,
  NavLink,
} from "react-router-dom";
import { useProfilesQuery } from "services/aws/endowments/endowments";
import { unsdgs } from "./unsdgs";
// import Voter from "components/Voter/Voter";
// import VoterForm from "components/Voter/VoterForm";
// import { useGovStaker } from "services/terra/hooks";

export default function Test() {
  const { path } = useRouteMatch();
  const { data = [] } = useProfilesQuery(undefined);
  const {
    ref,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  } = useClickScroll();
  console.log(data);
  return (
    <div className="pb-16 grid grid-rows-a1">
      <AppHead />
      <div className="padded-container grid content-start mt-2">
        {/**nav */}
        <h3 className="text-white-grey uppercase text-sm font-bold rounded-t-md mb-1">
          united nations sustainable development goals
        </h3>
        <div
          ref={ref}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className="flex gap-1 items-center mb-2 overflow-x-scroll scroll-hidden"
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
        </Switch>
      </div>
    </div>
  );
}

function Category(props: RouteComponentProps<{ id?: string }>) {
  const { data = [] } = useProfilesQuery(undefined);
  const id = +(props.match.params?.id || "0");
  const sdg = unsdgs[id];
  return (
    <>
      {(id === 0 && (
        <h3 className="text-white font-bold text-lg uppercase mt-2">
          all charities
        </h3>
      )) || (
        <div
          className={`bg-white bg-opacity-90 p-4 pb-2 shadow-md grid grid-cols-a1 grid-rows-2 items-center rounded-md`}
        >
          <h1 className="font-bold uppercase text-2xl mb-2 flex items-center">
            <span
              className={`mr-1 text-white ${sdg.bg} aspect-square w-6 grid place-items-center text-xs rounded-full`}
            >
              {id}
            </span>
            <span className={`${sdg.text_dark}`}>{sdg.title}</span>
          </h1>
          <p
            className={`${sdg.text_dark} text-opacity-90 justify-self-end pr-1 uppercase text-sm flex items-center`}
          >
            <span>learn more</span>
            <AiFillYoutube className="ml-1 text-xl" />
            <HiGlobeAlt className="ml-0.5 text-xl" />
          </p>
          <p className="self-start text-angel-grey">{sdg.desc}</p>
          <button
            className={`justify-self-end selft-start uppercase font-heading text-xs ${sdg.bg} px-3 py-2 rounded-md hover:bg-opacity-90 text-white font-bold`}
          >
            donate to this index
          </button>
        </div>
      )}

      <div className="mt-2 gap-4 grid grid-cols-4">
        {data
          .filter((profile) => (id === 0 ? true : profile.un_sdg === `${id}`))
          .map((profile) => (
            <CharityCard
              key={profile.endowment_address}
              img={profile.charity_image}
              title={profile.charity_name}
            />
          ))}
      </div>
    </>
  );
}

function CharityCard(props: { img: string; title: string }) {
  return (
    <div className="cursor-pointer w-full opacity-70 hover:opacity-100 bg-white rounded-md overflow-hidden shadow-md">
      <img className="object-cover w-full h-32" src={props.img} alt="hello" />
      <span className="font-heading block text-angel-grey p-2 uppercase font-bold text-sm">
        {props.title}
      </span>
    </div>
  );
}

function NavItem(props: { id: number }) {
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
