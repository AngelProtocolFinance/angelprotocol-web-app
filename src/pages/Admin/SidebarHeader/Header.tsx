import { Await } from "@remix-run/react";
import flying_character from "assets/images/flying-character.png";
import Image from "components/Image";
import { Suspense } from "react";

interface Endow {
  name: string;
  logo?: string;
}

interface Props {
  endow: Promise<Endow>;
}

export default function Loader({ endow }: Props) {
  return (
    <Suspense fallback={<img className="w-14 h-14" src={flying_character} />}>
      <Await resolve={endow}>{header}</Await>
    </Suspense>
  );
}

function header({ name, logo }: Endow) {
  return (
    <div
      className={`flex flex-col gap-1 w-full py-6 px-5 border-b border-gray-l4`}
    >
      <div className="flex justify-between">
        <Image className="w-14 h-14" src={logo || flying_character} />
      </div>
      <h5 className="text-sm font-bold truncate mt-2">{name}</h5>
    </div>
  );
}
