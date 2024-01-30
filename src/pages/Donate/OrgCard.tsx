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
      className={`p-4 md:p-0 md:rounded md:overflow-clip md:border border-prim ${classes}`}
    >
      <Image
        src={banner}
        className="h-24 object-cover w-full hidden md:block"
      />
      <div className="hidden md:flex items-center w-full overflow-visible h-0">
        <Image
          src={logo}
          className="h-14 w-14 border border-prim rounded-full object-cover bg-white ml-6"
        />
      </div>
      <div className="md:p-4 md:pt-11">
        <h4 className="text-lg text-ellipsis overflow-hidden text-balance mb-2">
          {name}
        </h4>
        <p className="text-gray-d1 text-sm">{tagline}</p>
      </div>
    </div>
  );
}
