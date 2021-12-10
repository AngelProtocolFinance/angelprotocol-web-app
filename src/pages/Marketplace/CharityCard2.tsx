import { Link } from "react-router-dom";
import { app, site } from "types/routes";
export default function CharityCard2(props: {
  img: string;
  title: string;
  address: string;
}) {
  return (
    <Link
      to={`${site.app}/${app.charity}/${props.address}`}
      className="cursor-pointer w-full opacity-70 hover:opacity-100 bg-white rounded-md overflow-hidden shadow-md p-1.5"
    >
      <img
        className={`object-cover w-full h-32 rounded-md border-2 border-angel-grey border-opacity-50`}
        src={props.img}
        alt=""
      />
      <span className="font-heading block text-angel-grey p-2 uppercase font-bold text-sm">
        {props.title}
      </span>
    </Link>
  );
}
