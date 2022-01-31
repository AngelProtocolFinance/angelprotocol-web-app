import LazyImage from "components/LazyImage/LazyImage";
import { useHistory } from "react-router-dom";
import { app, site } from "types/routes";
import useCardGesture from "./useCardGesture";
import useCharityCard from "./useCharityCard";

export default function CharityCard(props: { address: string }) {
  const profile = useCharityCard(props.address);
  const history = useHistory();
  const navigate = () =>
    history.push(`${site.app}/${app.charity}/${props.address}`);
  const {
    cardRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseLeave,
    handleMouseUp,
  } = useCardGesture(navigate);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      ref={cardRef}
      className="relative w-72 flex-none break-words rounded-2xl hover:shadow-3xl cursor-pointer mb-4 mx-2 p-2"
    >
      <LazyImage
        classes="bg-white rounded-lg img-no-drag w-full h-32 object-cover"
        src={profile.charity_image}
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
    </div>
  );
}
