import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { app, site } from "types/routes";
import useCharityCard from "./useCharityCard";

export default function CharityCard(props: { address: string }) {
  const profile = useCharityCard(props.address);
  const history = useHistory();
  const { path } = useRouteMatch();

  const open = () => {
    history.push(`${path}${app.charity}/${props.address}`);
  };

  return (
    <div
      className="relative w-72 flex-none break-words rounded-2xl hover:shadow-3xl cursor-pointer mb-4 mx-2 p-2"
      onClick={open}
    >
      <img
        className="bg-white rounded-lg img-no-drag w-full h-32 object-cover"
        src={profile.charity_image}
        alt="charity banner"
      />
      <Link
        to={`${site.app}/${app.charity}/${props.address}`}
        className={`block cursor-pointer font-heading text-white-grey hover:text-angel-orange font-bold text-sm uppercase mt-1.5`}
      >
        {profile.charity_name}
      </Link>
      <span className="text-opacity-80 line-clamp-2 text-sm text-white-grey">
        {profile.charity_overview}
      </span>
    </div>
  );
}
