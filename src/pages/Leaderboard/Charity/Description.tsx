import useDescription from "./useDescription";

type Props = {
  address: string;
  chainID: string;
};

export default function Description(props: Props) {
  const { icon, iconLight, url, name, description } = useDescription(
    props.address,
    props.chainID
  );
  return (
    <div className="flex flex-row items-center">
      <div className="w-32 mr-10">
        <img
          src={icon}
          alt=""
          className={`bg-white ${
            iconLight ? "bg-angel-blue" : ""
          } p-3 rounded-sm shadow-sm m-1 object-contain mr-4`}
        />
      </div>
      <div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="text-lg text-angel-grey hover:text-angel-blue active:text-angel-blue font-bold pt-2 block mb-1"
        >
          {name}
        </a>
        <div
          className={`relative w-96 text-sm text-angel-grey leading-normal mb-2`}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
