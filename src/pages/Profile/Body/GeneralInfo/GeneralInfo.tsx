import Content from "./Content";
import InfoColumn from "./InfoColumn";

type Props = { className: string };

export default function GeneralInfo({ className }: Props) {
  return (
    <div
      className={`${className} grid grid-rows-[auto_auto] gap-8 w-full h-full xl:grid-rows-1 xl:grid-cols-[1fr_auto]`}
    >
      <Content />
      <InfoColumn />
    </div>
  );
}
