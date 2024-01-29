import Image from "components/Image";

type Props = {
  name: string;
  logo: string;
  tagline: string;
};
export default function OrgCard(props: Props) {
  return (
    <div className="rounded overflow-clip w-60 border border-prim divide-y divide-prim">
      <Image src={props.logo} className="h-24 object-cover w-full overlay" />
      <div className="p-4">
        <h4 className="text-lg text-ellipsis overflow-hidden text-balance mb-2">
          {props.name}
        </h4>
        <p className="text-gray-d1 text-sm">{props.tagline}</p>
      </div>
    </div>
  );
}
