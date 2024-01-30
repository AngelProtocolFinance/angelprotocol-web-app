import Image from "components/Image";

type Props = {
  name: string;
  logo: string;
  banner: string;
  tagline: string;
  classes?: string;
};
export default function OrgCard({
  classes = "",
  name,
  logo,
  tagline,
  banner,
}: Props) {
  return (
    <div
      className={`md:rounded md:overflow-clip md:border border-prim ${classes}`}
    >
      <Image src={banner} className="h-24 object-cover w-full" />
      <div className="flex items-center w-full overflow-visible h-0">
        <Image
          src={logo}
          className="h-14 w-14 border border-prim rounded-full object-cover bg-white ml-6"
        />
      </div>
      <div className="px-4 pb-4 pt-11">
        <h4 className="text-lg text-ellipsis overflow-hidden text-balance mb-2">
          {name}
        </h4>
        <p className="text-gray-d1 text-sm">{tagline}</p>
      </div>
    </div>
  );
}
