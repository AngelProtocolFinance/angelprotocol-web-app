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
    <li className="grid grid-rows-aa1 rounded-md overflow-hidden shadow-lg border border-angel-grey border-opacity-30 bg-angel-grey">
      <img
        alt=""
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
      <p className="text-sm md:text-base leading-relaxed text-white-grey p-4">
        {description}
      </p>
      <div className="p-4 flex justify-between items-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="uppercase text-white-grey hover:text-thin-grey active:text-thin-grey font-heading font-semibold text-sm"
        >
          Learn more
        </a>
        <Link
          onClick={(e: any) => {
            //show donate modal with address context or to dedicated page?
            e.preventDefault();
            alert(`donate to ${props.address}`);
          }}
          to="#"
          className="font-heading bg-angel-blue hover:bg-angel-orange text-white font-bold shadow-sm uppercase px-5 py-1 rounded-full text-sm"
        >
          Donate
        </Link>
      </div>
    </li>
  );
}
