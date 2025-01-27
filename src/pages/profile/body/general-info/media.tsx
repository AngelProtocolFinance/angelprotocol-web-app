import type { IMedia } from "@better-giving/endowment";
import { ReactPlayer } from "components/react-player";

export default function Media({ media }: { media: IMedia[] }) {
  return (
    <div className="w-full h-full px-8 py-10 grid sm:grid-cols-[repeat(auto-fill,minmax(373px,1fr))] gap-8">
      {media.map((m) => (
        <Medium {...m} key={m.id} />
      ))}
    </div>
  );
}

function Medium(props: IMedia) {
  return (
    /** @see https://github.com/CookPete/react-player/issues/145 */
    <div className="relative pt-[56.25%] aspect-16/9 rounded-lg overflow-clip">
      <ReactPlayer
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        url={props.url}
        width="100%"
        height="100%"
        controls
      />
    </div>
  );
}
