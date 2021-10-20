import charityData from "./charityData.json";
import { Charities } from "./types";
import defaultIcon from "assets/images/angelprotocol-horiz-blu.png";

type Props = {
  address: string;
};

export default function Description(props: Props) {
  const data: Charities = charityData;
  const details = data[props.address] || {};
  const icon = details.icon || defaultIcon;
  const iconLight = details.iconLight || false;
  const url = details.url || "https://angelprotocol.io";
  const description = details.description || "Failed to get charity data";
  const name = details.name || "Charity";
  return (
    <div className="flex items-center">
      <img
        src={icon}
        alt=""
        className={`bg-angel-blue ${
          iconLight ? "bg-opacity-70" : "bg-opacity-10"
        } p-3 rounded-sm shadow-sm w-32 h-24 m-1 object-contain mr-4`}
      />
      <div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="text-lg text-angel-grey hover:text-angel-blue active:text-angel-blue font-bold pt-2 block mb-1"
        >
          {name}
        </a>
        <p
          className={`relative w-96 text-sm text-angel-grey leading-normal mb-2`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
