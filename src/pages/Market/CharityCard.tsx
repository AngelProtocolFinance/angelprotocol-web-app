import { Link } from "react-router-dom";
import { app, site } from "types/routes";
import useProfile from "./useProfile";
export default function CharityCard(props: { address: string }) {
  const profile = useProfile(props.address);
  return (
    <div className="relative w-64 flex-none break-words">
      <img
        className="bg-white rounded-lg img-no-drag w-full h-32 object-cover"
        src={profile.charity_image}
        alt="charity banner"
      />
      <Link
        to={`${site.app}/${app.charity}/${props.address}`}
        className="block cursor-pointer font-heading text-white-grey text-opacity-80 hover:text-opacity-100 font-bold text-base uppercase text-grey-light mt-1.5"
      >
        {profile.charity_name}
      </Link>
      <span className="text-opacity-80 line-clamp-2 text-sm text-white-grey">
        {profile.charity_overview}
      </span>
    </div>
  );
}
