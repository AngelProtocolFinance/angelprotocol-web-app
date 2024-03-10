import Image from "components/Image";

type Props = {
  name: string;
  logo: string;
  tagline: string;
  classes?: string;
};
export default function OrgCard({ classes = "", name, logo, tagline }: Props) {
  return (
    <div
      className={`p-4 grid grid-cols-[auto-1fr] gap-x-4 justify-start md:bg-white rounded-lg md:overflow-clip md:border border-gray-l4 ${classes}`}
    >
      <Image
        src={logo}
        className="size-14 border border-gray-l4 rounded-lg object-cover bg-white row-span-2"
      />
      <h4 className="text-ellipsis overflow-hidden text-nowrap md:text-balance col-start-2 w-full">
        {name}
      </h4>
      <p className="text-navy-l1 text-sm w-full">{tagline}</p>
    </div>
  );
}
