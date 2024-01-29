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
      className={`rounded overflow-clip border border-prim divide-y divide-prim ${classes}`}
    >
      <Image src={logo} className="h-24 object-cover w-full overlay" />
      <div className="p-4">
        <h4 className="text-lg text-ellipsis overflow-hidden text-balance mb-2">
          {name}
        </h4>
        <p className="text-gray-d1 text-sm">{tagline}</p>
      </div>
    </div>
  );
}
