import charityData from "../Leaderboard/Charity/charityData.json";
import { Charities } from "pages/Leaderboard/Charity/types";
import defaultIcon from "assets/images/angelprotocol-horiz-blu.png";
import { Link } from "react-router-dom";

type Props = {
  address: string;
};
export default function CharityCard(props: Props) {
  const data: Charities = charityData;
  const details = data[props.address] || {};
  const icon = details.icon || defaultIcon;
  const iconLight = details.iconLight || false;
  const url = details.url || "https://angelprotocol.io";
  const description = details.description || "Failed to get charity data";
  const name = details.name || "Charity";

  return (
    <li className="grid grid-rows-aa1 rounded-md overflow-hidden shadow-lg">
      <img
        src={icon}
        className={`h-32 w-full p-5 object-contain ${
          iconLight ? "bg-angel-grey" : "bg-white"
        }`}
      />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="shadow-md bg-blue-accent p-3 font-heading font-bold text-white-grey"
      >
        {name}
      </a>
      <p className="leading-relaxed text-thin-grey p-4 bg-angel-grey">
        {description}
      </p>
      <div className="p-4 bg-angel-grey flex justify-between items-base">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="uppercase text-white-grey font-heading text-sm"
        >
          Learn more
        </a>
        <Link
          to="#"
          className="font-heading bg-angel-orange text-white font-bold shadow-sm uppercase px-5 py-1 rounded-full text-sm"
        >
          Donate
        </Link>
      </div>
    </li>
  );
}
