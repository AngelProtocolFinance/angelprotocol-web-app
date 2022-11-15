import Content from "./Content";
import DetailsColumn from "./DetailsColumn";

type Props = { className: string };

export default function GeneralInfo({ className }: Props) {
  return (
    <div
      className={`${className} grid grid-rows-[auto_auto] gap-8 w-full h-full lg:grid-rows-1 lg:grid-cols-[1fr_auto]`}
    >
      <Content />
      <DetailsColumn className="self-start lg:sticky lg:top-28" />
    </div>
  );
}
