import { Link } from "react-router-dom";
import { app, site } from "types/routes";
import { unsdgs } from "pages/Fund/unsdgs";

export default function IndexCard(props: { id: number }) {
  const sdg = unsdgs[props.id];
  return (
    <div className="w-full grid justify-items-center sm:block sm:w-60 text-white py-8 border-t border-white border-opacity-40">
      <img
        src={sdg.icon}
        className="w-36 h-16 object-contain img-no-drag object-center sm:object-left"
        alt="icon representing category"
      />
      <Link
        to={`${site.app}/${app.fund}/${props.id}`}
        className="block font-heading font-bold uppercase mt-2 text-center sm:text-left"
      >
        {sdg.title}
      </Link>
      <p className="text-sm mb-1.5 line-clamp-2 text-center sm:text-left">
        {sdg.desc}
      </p>
      <button className="w-48 uppercase bg-yellow-blue disabled:bg-grey-accent p-1.5 rounded-lg font-bold text-sm mt-1">
        Donate to index
      </button>
    </div>
  );
}
