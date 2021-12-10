import { RouteComponentProps, Redirect, useRouteMatch } from "react-router-dom";
import { AiFillYoutube } from "react-icons/ai";
import { HiGlobeAlt } from "react-icons/hi";
import { useProfilesQuery } from "services/aws/endowments/endowments";
import { unsdgs } from "./unsdgs";
import CharityCard2 from "./CharityCard2";

export default function Category(props: RouteComponentProps<{ id?: string }>) {
  const { path } = useRouteMatch();
  const { data = [] } = useProfilesQuery(undefined);

  //sanitize id param
  const id = +(props.match.params?.id || "0");
  if (id - Math.floor(id) > 0 || isNaN(id) || id > 17) {
    return <Redirect to={`..${path}/0`} />;
  }

  const filtered_profiles = data.filter((profile) =>
    id === 0 ? true : profile.un_sdg === `${id}`
  );
  const is_no_members = filtered_profiles.length <= 0;

  const sdg = unsdgs[id];

  return (
    <>
      {(id === 0 && (
        <h3 className="text-white font-bold text-lg uppercase mt-2">
          all charities
        </h3>
      )) || (
        <div
          className={`bg-white bg-opacity-80 p-4  shadow-md grid content-start md:grid-cols-a1 md:grid-rows-2 items-center rounded-md mt-4`}
        >
          <h1 className="font-bold uppercase text-lg md:text-2xl mb-2 flex items-center">
            <span
              className={`mr-1 text-white ${sdg.bg} aspect-square w-6 grid place-items-center text-xs rounded-full`}
            >
              {id}
            </span>
            <span className={`${sdg.text_dark}`}>{sdg.title}</span>
          </h1>
          <p
            className={`${sdg.text_dark} text-opacity-90 mb-2 md:mb-0 md:justify-self-end pr-1 uppercase text-sm flex items-center`}
          >
            <span>learn more</span>
            <a href={sdg.youtube} target="_blank" rel="noopener noreferrer">
              <AiFillYoutube className="ml-1 text-xl cursor-pointer" />
            </a>
            <a href={sdg.website} target="_blank" rel="noopener noreferrer">
              <HiGlobeAlt className="ml-0.5 text-xl cursor-pointer" />
            </a>
          </p>
          <p className="text-angel-grey">{sdg.desc}</p>
          <button
            disabled={is_no_members}
            className={`ml-0 md:ml-2 mt-2 md:mt-0 w-52 text-center justify-self-end uppercase font-heading text-xs ${sdg.bg} disabled:bg-grey-accent py-2 rounded-md hover:bg-opacity-90 text-white font-bold`}
          >
            {is_no_members ? "Coming soon" : "Donate to this index"}
          </button>
        </div>
      )}

      <div className="mt-2 gap-4 sm:grid-cols-2 md:grid-cols-3 grid lg:grid-cols-4">
        {filtered_profiles.map((profile) => (
          <CharityCard2
            key={profile.endowment_address}
            img={profile.charity_image}
            title={profile.charity_name}
            address={profile.endowment_address}
          />
        ))}
      </div>
    </>
  );
}
