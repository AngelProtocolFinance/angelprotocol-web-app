import { Link } from "react-router-dom";
import { app, site } from "types/routes";
import { unsdgs } from "pages/Fund/unsdgs";

export default function IndexCard(props: { id: number; is_empty: boolean }) {
  const sdg = unsdgs[props.id];
  return (
    <div className="w-60 text-white py-6 border-t border-white border-opacity-40">
      <img
        src={sdg.icon}
        className="w-36 h-16 object-contain img-no-drag object-left"
        alt="icon representing category"
      />
      <Link
        to={`${site.app}/${app.fund}/${props.id}`}
        className="font-heading font-bold uppercase mt-1"
      >
        {sdg.title}
      </Link>
      <p className="text-sm mb-1.5 line-clamp-2">{sdg.desc}</p>
      <button
        disabled={props.is_empty}
        className="w-48 uppercase bg-yellow-blue disabled:bg-grey-accent p-1.5 rounded-lg font-bold text-sm"
      >
        {props.is_empty ? "Coming soon!" : "Donate to index"}
      </button>
    </div>
  );
}
