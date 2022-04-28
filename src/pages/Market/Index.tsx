import { IconTypes } from "@types-component/icons";
import { EndowmentEntry } from "@types-server/contracts";
import Icon from "components/Icons/Icons";
import useHorizontalScroll from "hooks/useHorizontalScroll";
import CharityCard from "./CharityCard";
import IndexCard from "./IndexCard";

export default function Index(props: {
  id: number;
  profiles: EndowmentEntry[];
}) {
  const { ref, forward, backward, showBack, showForward } =
    useHorizontalScroll();
  //remove infinite scroll temporarily

  return (
    <section className="grid grid-cols-1 sm:grid-cols-a1 border-t border-white/10">
      <IndexCard id={props.id} />
      <section className="overflow-hidden relative group">
        <div
          ref={ref}
          className="flex gap-4 overflow-x-scroll scroll-hidden py-2"
        >
          {props.profiles.map((profile) => (
            <CharityCard key={profile.address} {...profile} />
          ))}
        </div>
        {showBack && (
          <Button className="left-0" _iconType="Back" onClick={backward} />
        )}
        {showForward && (
          <Button className="right-0" _iconType="Forward" onClick={forward} />
        )}
      </section>
    </section>
  );
}

function Button({
  _iconType,
  className,
  ...restProps
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  _iconType: IconTypes;
}) {
  return (
    <button
      {...restProps}
      className={`${
        className || ""
      } w-22 h-22 p-2 flex rounded-full absolute top-1/2 -translate-y-1/2  group-hover:flex bg-blue-accent/60 hover:bg-angel-blue/60 items-center justify-center group`}
    >
      <Icon type={_iconType} className="text-white text-4xl " />
    </button>
  );
}
