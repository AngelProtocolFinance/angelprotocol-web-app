import { Endowment } from "types/aws";
import Card from "./Card";

export default function Page({ endowments }: { endowments: Endowment[] }) {
  return (
    <div
      className={`w-full grid grid-cols-[repeat(auto-fit,minmax(245px,1fr))] gap-4 content-start`}
    >
      {endowments.map((endow) => (
        <Card {...endow} key={endow.id} />
      ))}
    </div>
  );
}
