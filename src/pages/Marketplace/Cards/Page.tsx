import { Endowment } from "types/aws";
import Card from "./Card";

export default function Page({ endowments }: { endowments: Endowment[] }) {
  return (
    <div
      className={`w-full grid ${
        endowments.length < 3
          ? "grid-cols-[repeat(auto-fill,minmax(255px,1fr))]"
          : "grid-cols-[repeat(auto-fit,minmax(245px,1fr))]"
      } gap-4 content-start`}
    >
      {endowments.map((endow) => (
        <Card {...endow} key={endow.id} />
      ))}
    </div>
  );
}
