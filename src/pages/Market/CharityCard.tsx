import LazyImage from "components/LazyImage/LazyImage";
import { Link } from "react-router-dom";
import { app, site } from "types/routes";
import useCharityCard from "./useCharityCard";
import { charity_details } from "services/aws/endowments/placeholders";

export default function CharityCard(props: { address: string }) {
  const profile = useCharityCard(props.address);

  return (
    <Link
      to={`${site.app}/${app.charity}/${props.address}`}
      className="relative w-72 flex-none break-words rounded-2xl hover:shadow-3xl cursor-pointer mb-4 mx-2 p-2"
    >
      <LazyImage
        classes="bg-white rounded-lg img-no-drag w-full h-32 object-cover"
        src={profile.charity_image || charity_details.icon}
        alt="charity banner"
        width="272"
        height="128"
      />
      <p className="block cursor-pointer font-heading text-white-grey hover:text-angel-orange font-bold text-sm uppercase mt-1.5">
        {profile.charity_name}
      </p>
      <span className="text-opacity-80 line-clamp-2 text-sm text-white-grey">
        {profile.charity_overview}
      </span>
    </Link>
  );
}
