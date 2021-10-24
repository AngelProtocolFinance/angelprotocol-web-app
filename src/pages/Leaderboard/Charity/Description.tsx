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
    <div className="flex items-center">
      <img
        src={icon}
        alt=""
        className={`bg-angel-blue ${
          iconLight ? "bg-opacity-70" : "bg-opacity-10"
        } p-3 rounded-sm shadow-sm w-32 m-1 object-contain mr-4`}
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
        <span
          className={`relative text-sm text-angel-grey leading-normal mb-2`}
        >
          {description}
        </span>
      </div>
    </div>
  );
}
