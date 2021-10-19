import { charities, defaultURL, defIcon } from "./charities";
import { Addresses } from "./types";
import useDetails from "./useDetails";

type Props = {
  address: Addresses;
};

export default function Description(props: Props) {
  const { url = defaultURL, icon = defIcon } = charities[props.address] || {}; //details only exists on mainnet
  const { name, desc } = useDetails(props.address);
  return (
    <div className="flex items-center">
      <img src={icon} alt="" className="w-28 h-20 m-1 object-contain mr-4" />
      <div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="text-lg text-angel-grey font-bold pt-2 block mb-1"
        >
          {name}
        </a>
        <p
          className={`relative w-96 text-sm text-angel-grey leading-normal mb-2`}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}
